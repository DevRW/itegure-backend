import express from 'express';
import { ClassStudiesController } from './controller';
import authMiddl from '../auths/middleware';
import classStudiesHelper from './helper';
import classStudiesMiddleware from './middleware';
import requestValidator from '../users/middleware';

const app = express.Router();
const classStudy = new ClassStudiesController();
app.post(
  '/',
  authMiddl.isAuth,
  classStudiesHelper.postClass(),
  requestValidator.validator,
  classStudiesMiddleware.checkIfClassNameExist,
  classStudy.createClass
);
app.get('/', classStudy.viewAllClasses);
app.put(
  '/:id',
  authMiddl.isAuth,
  classStudiesMiddleware.checkIfClassExist,
  classStudiesHelper.postClass(),
  requestValidator.validator,
  classStudy.updateClass
);
app.delete('/:id', authMiddl.isAuth, classStudiesMiddleware.checkIfClassExist, classStudy.deleteClass);

export default app;
