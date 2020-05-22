import { check } from 'express-validator';
import moment from 'moment';
export class TimetableHelper {
  /**
   * define all timetable schema validation and return them
   */
  schemaValidation() {
    return {
      dateSchema: check('date').notEmpty().withMessage('name must be between 4 to 15 chars'),
      timeFromSchema: check('timeFrom').notEmpty().withMessage('timeFrom is required'),
      timeToSchema: check('timeTo').notEmpty().withMessage('timeTo is required'),
      classSchema: check('classStudy').notEmpty().withMessage('class is required'),
      subjectSchema: check('subject').notEmpty().withMessage('subject is required'),
      stationSchema: check('station').notEmpty().withMessage('station is required'),
    };
  }
  // timetable validation schema
  timetableSchemas() {
    const {
      dateSchema,
      timeFromSchema,
      timeToSchema,
      classSchema,
      subjectSchema,
      stationSchema,
    } = this.schemaValidation();
    return [dateSchema, timeFromSchema, timeToSchema, classSchema, subjectSchema, stationSchema];
  }

  calculateTimeStamp(date) {
    return Math.round(new Date(date).getTime() / 1000);
  }

  generateDate(date, time) {
    return moment(`${date} ${time}`).format('YYYY-MM-DD hh:mm');
  }

  getCurrentMinutes() {
    const date = new Date();
    if (date.getMinutes() < 10) {
      return `0${date.getMinutes()}`;
    }
    return date.getMinutes();
  }
  getCurrentHour() {
    const data = new Date();
    if (data.getHours() < 10) {
      return `0${data.getHours()}`;
    }
    return data.getHours();
  }
  getDate() {
    const data = new Date();
    const month = Number(data.getMonth()) + 1;
    const date = Number(data.getDate());
    const year = data.getFullYear();
    const getMonth = month < 10 ? `0${month}` : month;
    const calDate = date < 10 ? `0${date}` : date;
    return `${year}-${getMonth}-${calDate}`;
  }
  getCurrentDate(value) {
    const data = new Date(value);
    const month = Number(data.getMonth()) + 1;
    const date = Number(data.getDate());
    const year = data.getFullYear();
    const getMonth = month < 10 ? `0${month}` : month;
    const calDate = date < 10 ? `0${date}` : date;
    return `${year}-${getMonth}-${calDate}`;
  }
  getNextDayDate() {
    const data = new Date();
    data.setDate(new Date().getDate() + 1);
    const month = Number(data.getMonth()) + 1;
    const date = Number(data.getDate());
    const year = data.getFullYear();
    const getMonth = month < 10 ? `0${month}` : month;
    const calDate = date < 10 ? `0${date}` : date;
    return `${year}-${getMonth}-${calDate}`;
  }
}

export default new TimetableHelper();
