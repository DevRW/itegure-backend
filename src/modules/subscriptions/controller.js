import response from '../generates/response';
import subscriptionService from './service';
import generate from '../generates/generate';
import dotenv from 'dotenv';
dotenv.config();

const { SUBSCRIPTION_SECRET_KEY, TWILIO_PHONE_NUMBER, RWANDA_CODE } = process.env;
export class SubscriptionCtrl {
  async createSubscription(req, res) {
    try {
      const { phoneNumber, name } = req.body;
      const { subscription } = await subscriptionService.createSubscription({
        phoneNumber: `${RWANDA_CODE}${phoneNumber}`,
        name,
      });
      const { verification } = await subscriptionService.createVerificationCode(subscription.phoneNumber);
      if (verification) {
        // send verification code
        const body = `your verification code is ${verification.code}`;
        await generate.generateMessage({ body, to: subscription.phoneNumber });
        return response.successResponse({
          res,
          status: 201,
          data: { message: 'check verification code we have sent on your mobile phone', phoneNumber },
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async authenticateSubscriber(req, res) {
    try {
      const { code, phoneNumber } = req.body;
      const find = await subscriptionService.findPendingVerificationCode(`${RWANDA_CODE}${phoneNumber}`, code);
      if (!find) {
        return response.errorResponse({
          res,
          status: 401,
          data: response.authError('failed, the provided information does not match to our records'),
        });
      }
      // check phoneNumber exist in subscription
      const checkSubscription = await subscriptionService.findOneSubscription(find.phoneNumber);
      if (!checkSubscription) {
        return response.errorResponse({
          res,
          status: 401,
          data: response.authError('failed, the provided information does not match to our records'),
        });
      }
      //update verification
      if (await subscriptionService.updateVerificationCode(code, find.phoneNumber)) {
        //generate auth token
        const token = generate.generateToken({
          secret: SUBSCRIPTION_SECRET_KEY,
          payload: generate.subscriptionPayload(checkSubscription),
          time: '4h',
        });
        return response.successResponse({
          res,
          status: 200,
          data: { token, message: `welcome back ${checkSubscription.name}` },
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async login(req, res) {
    try {
      const { phoneNumber } = req.body;
      const find = await subscriptionService.findOneSubscription(`${RWANDA_CODE}${phoneNumber}`);
      if (!find) {
        return response.errorResponse({
          res,
          status: 401,
          data: response.authError('failed, the provided information does not match to our records'),
        });
      }
      const { verification } = await subscriptionService.createVerificationCode(find.phoneNumber);
      // send verification code
      if (verification) {
        // send verification code
        const body = `Your verification code is ${verification.code}`;
        await generate.generateMessage({ body, to: find.phoneNumber });
        return response.successResponse({
          res,
          status: 200,
          data: { phoneNumber, message: 'check verification code we have sent on your mobile phone' },
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async currentSubscriberProfile(req, res) {
    try {
      return response.successResponse({ res, status: 200, data: { profile: req.subscriber } });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async sendUnsubscribeCode(req, res) {
    try {
      const { phoneNumber } = req.subscriber;
      const { verification } = await subscriptionService.createVerificationCode(phoneNumber);
      if (verification) {
        const body = `your verification code is ${verification.code}`;
        await generate.generateMessage({ body, to: phoneNumber });
        return response.successResponse({
          res,
          status: 200,
          data: {
            phoneNumber: verification.phoneNumber,
            message: 'check verification code we have sent on your mobile phone',
          },
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async unsubscribe(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const remove = await subscriptionService.unsubscription(subscriptionId);
      //update verification
      if (remove) {
        return response.successResponse({
          res,
          status: 200,
          data: remove,
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async loginFromUssd(req, res) {
    try {
      const { phoneNumber } = req.body;
      const find = await subscriptionService.findOneSubscription(`${RWANDA_CODE}${phoneNumber}`);
      if (!find) {
        return response.errorResponse({
          res,
          status: 401,
          data: response.authError('failed, the provided information does not match to our records'),
        });
      }
      const subscriberInformation = await subscriptionService.findSubscriberInformation(find.subscriptionId);
      //generate auth token
      const token = generate.generateToken({
        secret: SUBSCRIPTION_SECRET_KEY,
        payload: generate.subscriptionPayload(find),
        time: '4h',
      });
      return response.successResponse({
        res,
        status: 200,
        data: { token, message: `welcome back ${find.name}`, information: subscriberInformation },
      });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }

  async createSubscriberUsingUssd(req, res) {
    try {
      const { phoneNumber, name } = req.body;
      const { subscription } = await subscriptionService.createSubscription({
        phoneNumber: `${RWANDA_CODE}${phoneNumber}`,
        name,
      });
      const subscriberInformation = await subscriptionService.findSubscriberInformation(subscription.subscriptionId);
      //generate auth token
      const token = generate.generateToken({
        secret: SUBSCRIPTION_SECRET_KEY,
        payload: generate.subscriptionPayload(subscription),
        time: '4h',
      });
      return response.successResponse({
        res,
        status: 200,
        data: { token, message: `welcome back ${subscription.name}`, information: subscriberInformation },
      });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }
}
export default new SubscriptionCtrl();
