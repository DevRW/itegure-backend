import express from 'express';
import { TimetableController } from './controller';
import authMiddl from '../auths/middleware';
import timetableHelper from './helper';
import timetableMiddleware from './middleware';
import subjectsMiddleware from '../subjects/middleware';
import classStudyMiddleware from '../classStudies/middleware';
import stationMiddleware from '../stations/middleware';
import requestValidator from '../users/middleware';

const app = express.Router();
const timetable = new TimetableController();
app.post(
  '/',
  authMiddl.isAuth,
  timetableHelper.timetableSchemas(),
  requestValidator.validator,
  timetableMiddleware.checkIftimetableExist,
  subjectsMiddleware.checkIfSubjectExist,
  classStudyMiddleware.checkIfClassExist,
  stationMiddleware.checkIfStationExist,
  timetable.createTimetable
);
app.get('/', timetable.viewTimetable);
app.put(
  '/:id',
  authMiddl.isAuth,
  timetableHelper.timetableSchemas(),
  requestValidator.validator,
  timetableMiddleware.checkIftimetableExist,
  subjectsMiddleware.checkIfSubjectExist,
  classStudyMiddleware.checkIfClassExist,
  stationMiddleware.checkIfStationExist,
  timetable.updateTimetable
);
app.delete('/:id', authMiddl.isAuth, timetableMiddleware.checkIfprogramExist, timetable.deleteTimetable);

// GET find upcomping lessons
app.get('/upcoming-lessons/:classStudy', timetable.getAllUpcomingLessons);

export default app;
