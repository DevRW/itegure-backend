import models from '../../database/models';
import { notificationStatus } from '../../database/models/notification';
import moment from 'moment';
import timetableHelper from '../timetable/helper';
import { and, Op } from 'sequelize';
const { notification, timetable, subscription, classStudy, station, student } = models;
export class NotificationService {
  async notifyParent() {
    const { getDate } = timetableHelper;
    const hours = new Date().getHours();
    const getTime = `${hours + 2}:00`;
    const addMinutes = `${hours + 2}:59`;
    const todayDate = moment().format('YYYY-MM-DD');
    const time1 = `${getDate()} ${getTime}`;
    const time2 = `${getDate()} ${addMinutes}`;
    const query = {
      where: and({ date: new Date(todayDate), timeFrom: { [Op.between]: [time1, time2] } }),
      include: [
        {
          model: classStudy,
          as: 'classStudyKeyId',
          include: [{ model: student, as: 'class', include: [{ model: subscription, as: 'parent' }] }],
        },
        { model: station, as: 'stationKeyId' },
      ],
    };
    const find = await timetable.findAll(query);
    return { todayDate: new Date(), data: find.length };
  }
}
export default new NotificationService();
