import response from '../generates/response';
import subscriptionService from './service';
import generate from '../generates/generate';
import dotenv from 'dotenv';
dotenv.config();

const { SUBSCRIPTION_SECRET_KEY } = process.env;
export class SubscriptionCtrl {
  async verification(req, res) {
    try {
      const { phoneNumber } = req.body;
      const data = {
        recipients: phoneNumber,
        sender: 'KSE',
        message: 'hello world',
      };
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }
  async createSubscription(req, res) {
    try {
      const { phoneNumber, name } = req.body;
      const create = await subscriptionService.createSubscription({ phoneNumber, name });
      if (create) {
        await subscriptionService.createVerificationCode(create.phoneNumber);
        return response.successResponse({
          res,
          status: 201,
          data: { message: 'please verify code we have sent on your mobile phone' },
        });
      }
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }
  async authenticateUser(req, res) {
    try {
      const { code, phoneNumber } = req.body;
      const find = await subscriptionService.findPendingVerificationCode(phoneNumber, code);
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
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }
}
export default new SubscriptionCtrl();
