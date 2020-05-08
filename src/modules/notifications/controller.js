import response from '../generates/response';
import notificationService from './service';
import { notificationStatus } from '../../database/models/notification';
import axios from 'axios';

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
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occured, try again') });
    }
  }

  sendReminder(data) {
    const { SMS_API_GATEWAY, SMS_SENDER_NAME, SMS_CLIENT, SMS_CLIENT_PASSWORD } = process.env;
    const randomNumber = Math.floor(Math.random() * 11000);
    const randomMsgId = `LN${randomNumber}`;
    if (data.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const { id: timetableId, timeFrom, timeTo, classStudyKeyId, stationKeyId, subjectKeyId } = element;
        const { class: student } = classStudyKeyId;
        const { name: stationName, type } = stationKeyId;
        const { name: subjectName } = subjectKeyId;
        for (let j = 0; j < student.length; j++) {
          const studentElement = student[j];
          const { parent, name: studentName } = studentElement;
          const { phoneNumber, subscriptionId } = parent;
          const body = `Muraho, ${studentName} aribuze kwiga isomo rya ${subjectName} kuri ${type} ${stationName} saa ${timeFrom} - ${timeTo} Murakoze`;

          axios
            .post(`${SMS_API_GATEWAY}`, {
              ohereza: `${SMS_SENDER_NAME}`,
              ubutumwa: `${body}`,
              msgid: `${randomMsgId}`,
              kuri: `${phoneNumber}`,
              client: `${SMS_CLIENT}`,
              password: `${SMS_CLIENT_PASSWORD}`,
            })
            .then((response) => {
              notificationService
                .registerSentMessage({
                  message: body,
                  subscriberId: subscriptionId,
                  status: notificationStatus[0],
                  timetableId,
                })
                .then((datas) => {});
            })
            .catch((error) => {
              throw error;
            });
        }
      }
    }
  }
}
export default new NotificationController();
