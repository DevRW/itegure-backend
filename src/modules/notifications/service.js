import models from '../../database/models';
import { notificationStatus } from '../../database/models/notification';
import moment from 'moment';
import timetableHelper from '../timetable/helper';
import { and, Op } from 'sequelize';
const { notification, timetable, subscription, classStudy, station, student, subject } = models;
export class NotificationService {
  async notifyParent(studentClass, parentPhone) {
    const { getDate, getCurrentMinutes, getCurrentHour } = timetableHelper;
    const getTime = `${getCurrentHour()}:${getCurrentMinutes()}`;
    const realDateAndTime = `${getDate()} ${getTime}`;
    const nextDayDate = moment().add(1, 'day').format('YYYY-MM-DD');
    const condition =
      studentClass !== null
        ? { timeFrom: { [Op.gt]: realDateAndTime }, classStudy: studentClass }
        : { date: new Date(nextDayDate) };
    const checkParentPhone = studentClass !== null && parentPhone !== null ? { phoneNumber: parentPhone } : null;
    const limitTimeTable = studentClass !== null ? 3 : null;
    const query = {
      where: and(condition),
      include: [
        {
          model: classStudy,
          as: 'classStudyKeyId',
          include: [
            {
              model: student,
              as: 'class',
              include: [{ model: subscription, as: 'parent', where: checkParentPhone }],
            },
          ],
        },
        { model: station, as: 'stationKeyId' },
        { model: subject, as: 'subjectKeyId' },
      ],
      limit: limitTimeTable,
    };
    const find = await timetable.findAll(query);
    return find;
  }

  async findSubscriberNotification(subscriptionId) {
    const query = {
      where: { subscriberId: subscriptionId },
      include: [
        {
          model: timetable,
          as: 'timetable',
          include: [
            { model: subject, as: 'subjectKeyId' },
            { model: station, as: 'stationKeyId' },
            { model: classStudy, as: 'classStudyKeyId' },
          ],
        },
      ],
    };
    const find = await notification.findAll(query);
    return find;
  }

  async findAllNotification() {
    const query = {
      include: [
        {
          model: timetable,
          as: 'timetable',
          include: [
            { model: subject, as: 'subjectKeyId' },
            { model: station, as: 'stationKeyId' },
            { model: classStudy, as: 'classStudyKeyId' },
          ],
        },
        { model: subscription, as: 'subscription' },
      ],
    };
    const find = await notification.findAll(query);
    return find;
  }
  async registerSentMessage(data) {
    await notification.create(data);
    return {
      message: 'Message Successfully Sent.',
    };
  }
}
export default new NotificationService();
