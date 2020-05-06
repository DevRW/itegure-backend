import response from '../generates/response';
import subscriptionService from './service';

export class SubscriptionMiddleware {
  async checkIfPhoneExist(req, res, next) {
    try {
      const { phoneNumber } = req.body;
      const { RWANDA_CODE } = process.env;
      const find = await subscriptionService.findOneSubscription(`${RWANDA_CODE}${phoneNumber}`);
      if (find) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ param: 'phoneNumber', msg: 'phone number already used.' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('internal server error.') });
    }
  }
}
export default new SubscriptionMiddleware();
