import response from '../generates/response';
import notificationService from './service';

export class NotificationController {
  async getSubscriberNotification(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const find = await notificationService.findSubscriberNotification(subscriptionId);
      return response.successResponse({ res, status: 200, data: find });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occured, try again') });
    }
  }

  async getAllNotification(req, res) {
    try {
      const find = await notificationService.findAllNotification();
      return response.successResponse({ res, status: 200, data: find });
    } catch (error) {
        console.log(error);
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occured, try again') });
    }
  }
}
export default new NotificationController();
