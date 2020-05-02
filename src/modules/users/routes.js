import express from 'express';
import userCtrl from './controller';
import userHelper from './helper';
import userMiddl from './middleware';
import authMiddl from '../auths/middleware';
const app = express.Router();

// POST - signup
app.post('/signup', userHelper.signupSchemas(), userMiddl.validator, userCtrl.createAccount);

// POST - LOGIN
app.post('/signin', userCtrl.login);

// update
app.put(
  '/update/information',
  authMiddl.isAuth,
  userHelper.updateInformation(),
  userMiddl.validator,
  userCtrl.updateInformation
);

// get current profile
app.get('/read/myprofile', authMiddl.isAuth, userCtrl.profile);

// change password
app.put(
  '/update/password',
  authMiddl.isAuth,
  userHelper.changePassword(),
  userMiddl.validator,
  userCtrl.changePassword
);
export default app;
