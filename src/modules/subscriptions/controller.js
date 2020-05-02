import response from '../generates/response';
import subscriptionService from './service';
import request from 'requests';

const { INTOUCH_USERNAME, INTOUCH_PASSWORD, INTOUCH_API_URL } = process.env;
export class SubscriptionCtrl {
  async verification(req, res) {
    try {
      const { phoneNumber } = req.body;
      const data = {
        recipients: phoneNumber,
        sender: 'lreminder',
        message: 'hello world',
      };
      //   auth:{username: INTOUCH_USERNAME, password: INTOUCH_PASSWORD}
      const send = await request(INTOUCH_API_URL, data);
      console.log(send);
    } catch (error) {
      console.log(error);
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occurred try again.') });
    }
  }
}
export default new SubscriptionCtrl();
