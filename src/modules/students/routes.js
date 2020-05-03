import express from 'express';
import studentCtrl from './controller';
import studentHelper from './helper';
import userMiddlr from '../users/middleware';
import studentMiddlr from './middleware';
import authMiddl from '../auths/middleware';
import classMiddl from '../classStudies/middleware';
import subjectMiddl from '../subjects/middleware';
const app = express.Router();

// POST - create student
app.post(
  '/create-student',
  authMiddl.isSubscriberAuth,
  studentHelper.addStudent(),
  userMiddlr.validator,
  classMiddl.checkIfClassExist,
  subjectMiddl.checkIfSubjectExist,
  studentCtrl.assignStudent
);

// PUT - update student
app.put(
  '/update-student/:studentId',
  authMiddl.isSubscriberAuth,
  studentMiddlr.checkStudentId,
  studentHelper.addStudent(),
  userMiddlr.validator,
  classMiddl.checkIfClassExist,
  subjectMiddl.checkIfSubjectExist,
  studentCtrl.updateStudent
);

// DELETE - Delete stuent
app.delete('/delete-student/:studentId', studentMiddlr.checkStudentId, studentCtrl.deleteStudent);

export default app;
