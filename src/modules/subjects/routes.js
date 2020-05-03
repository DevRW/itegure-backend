import express from 'express';
import { SubjectController } from './controller';
import authMiddl from '../auths/middleware';
import subjectsHelper from './helper';
import subjectsMiddleware from './middleware';
import requestValidator from '../users/middleware';

const app = express.Router();
const subject = new SubjectController();
app.post(
  '/',
  authMiddl.isAuth,
  subjectsHelper.subjectSchemas(),
  requestValidator.validator,
  subjectsMiddleware.checkIfSubjectNameExist,
  subject.createSubject
);
app.get('/', subject.viewAllSubject);
app.put(
  '/:id',
  authMiddl.isAuth,
  subjectsMiddleware.checkIfSubjectExist,
  subjectsHelper.subjectSchemas(),
  requestValidator.validator,
  subject.updateSubject
);
app.delete('/:id', authMiddl.isAuth, subjectsMiddleware.checkIfSubjectExist, subject.deleteSubject);

export default app;
