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
app.put('/update', authMiddl.isAuth, userHelper.updateInformation(), userMiddl.validator, userCtrl.updateInformation);

export default app;
