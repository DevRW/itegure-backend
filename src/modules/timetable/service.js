import model from '../../database/models';
import timeTableHelper from './helper';
const { timetable, classStudy, subject, station } = model;

export class timetableServices {
  async register(data) {
    const { generateDate, calculateTimeStamp } = timeTableHelper;
    const { timeFrom, timeTo, date } = data;
    const from = `${date} ${timeFrom}`;
    const to = `${date} ${timeTo}`;
    await timetable.create({
      ...data,
      timeFrom: from,
      timeTo: to,
    });
    return {
      message: 'Timetable Successfully created.',
    };
  }
  async findOne(query) {
    const find = await timetable.findOne(query);
    return find;
  }
  async findAllTimetable() {
    const query = {
      include: [
        { model: classStudy, as: 'classStudyKeyId' },
        { model: subject, as: 'subjectKeyId' },
        { model: station, as: 'stationKeyId' },
      ],
      order: [['id', 'DESC']],
    };
    const find = await timetable.findAll(query);
    return find;
  }
  async updateTimetable(value, query) {
    await timetable.update(value, query);
    return { message: 'Timetable Successfully Updated.' };
  }
  async deleteTimetable(query) {
    await timetable.destroy(query);
    return { message: 'Timetable Successfully Deleted.' };
  }
}

export default new timetableServices();
