import express from 'express';
import studentCtrl from './controller';
import studentHelper from './helper';
import userMiddlr from '../users/middleware';
import studentMiddlr from './middleware';

const app = express.Router();

// POST - create student
app.post('/create-student', studentHelper.addStudent(), userMiddlr.validator, studentCtrl.assignStudent);

// PUT - update student
app.put(
  '/update-student/:studentId',
  studentMiddlr.checkStudentId,
  studentHelper.addStudent(),
  userMiddlr.validator,
  studentCtrl.updateStudent
);

// DELETE - Delete stuent
app.delete('/delete-student/:studentId', studentMiddlr.checkStudentId, studentCtrl.deleteStudent);

export default app;
