import { check } from 'express-validator';

export class TimetableHelper {
  /**
   * define all timetable schema validation and return them
   */
  schemaValidation() {
    return {
      dateSchema: check('date').notEmpty().withMessage('name must be between 4 to 15 chars'),
      timeFromSchema: check('timeFrom').notEmpty().withMessage('class is required'),
      timeToSchema: check('timeTo').notEmpty().withMessage('class is required'),
      classSchema: check('classStudy').notEmpty().withMessage('class is required'),
      subjectSchema: check('subject').notEmpty().withMessage('class is required'),
      stationSchema: check('station').notEmpty().withMessage('class is required'),
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
}

export default new TimetableHelper();
