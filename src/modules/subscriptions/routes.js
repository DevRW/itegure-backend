import express from 'express';
import subscriptionCtrl from './controller';
import subscriptionHelper from './helper';
import userMiddl from '../users/middleware';
import subscriptionMiddl from './middleware';

const app = express.Router();

//POST - Create subscription
app.post(
  '/create-subscription',
  subscriptionHelper.createSchema(),
  userMiddl.validator,
  subscriptionMiddl.checkIfPhoneExist,
  subscriptionCtrl.createSubscription
);

// POST - login
app.post('/login', subscriptionCtrl.login);

// POST - authenticate
app.post(
  '/authenticate-subscriber',
  subscriptionHelper.authenticateSchema(),
  userMiddl.validator,
  subscriptionCtrl.authenticateSubscriber
);

export default app;
