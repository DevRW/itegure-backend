import express from 'express';
import studentCtrl from './controller';
import studentHelper from './helper';
import userMiddlr from '../users/middleware';

const app = express.Router();

// POST - create student
app.post('/create-student', studentHelper.addStudent(), userMiddlr.validator, studentCtrl.assignStudent);

// PUT - update student
app.put('/update-student/:studentId', studentHelper.addStudent(), userMiddlr.validator, studentCtrl.updateStudent);

// DELETE - Delete stuent
app.delete('/delete-student/:studentId', studentCtrl.deleteStudent);

export default app;
