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
    const newArrayPush = [];
    if (data.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const { id: timetableId, timeFrom, timeTo, classStudyKeyId, stationKeyId, subjectKeyId } = element;
        const { class: student, name: className } = classStudyKeyId;
        const { name: stationName, type } = stationKeyId;
        const { name: subjectName } = subjectKeyId;
        const timeTableInfo = { stationName, timetableId, subjectName, timeFrom, timeTo, className };
        for (let j = 0; j < student.length; j++) {
          const studentElement = student[j];
          const { parent, name: studentName, studentId } = studentElement;
          const { phoneNumber, subscriptionId } = parent;
          const studentInfo = { studentId, subscriptionId, studentName, phoneNumber };
          const timeTableWithStudent = Object.assign(studentInfo, timeTableInfo);
          newArrayPush.push(timeTableWithStudent);
        }
      }
      const sortedArray = newArrayPush.sort((a, b) => parseFloat(a.studentId) - parseFloat(b.studentId));
      let newArrayElement;
      for (let currentIndex = 0; currentIndex < sortedArray.length; currentIndex++) {
        newArrayElement = sortedArray[currentIndex];
        const {
          studentId,
          studentName,
          className,
          phoneNumber,
          subscriptionId,
          timetableId,
          subjectName,
          stationName,
          timeFrom,
          timeTo,
        } = newArrayElement;
        let message = `Aya niyo masomo azigwa na ${className}.`;
        const currentTimefromYear = new Date(timeFrom);
        const currentYear = currentTimefromYear.getFullYear();
        message += ` ${subjectName} kuri ${stationName} ${timeFrom.replace(`${currentYear}-`, '').replace('-', '/')}`;
        while (currentIndex !== sortedArray.length - 1 && studentId === sortedArray[currentIndex + 1]['studentId']) {
          let {
            subjectName: newSubjectName,
            stationName: newStation,
            timeFrom: newTimeFrom,
            timeTo: newTimeto,
          } = sortedArray[currentIndex + 1];
          const currentTimefromYear = new Date(newTimeFrom);
          const currentYear = currentTimefromYear.getFullYear();
          message += `, ${newSubjectName} kuri ${newStation
            .replace(`${currentYear}-`, '')
            .replace('-', '/')} ${newTimeFrom}`;
          currentIndex++;
        }
        axios
          .post(`${SMS_API_GATEWAY}`, {
            ohereza: `${SMS_SENDER_NAME}`,
            ubutumwa: `${message}`,
            msgid: `${randomMsgId}`,
            kuri: `${phoneNumber}`,
            client: `${SMS_CLIENT}`,
            password: `${SMS_CLIENT_PASSWORD}`,
          })
          .then((response) => {
            notificationService
              .registerSentMessage({
                message: message,
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
export default new NotificationController();
