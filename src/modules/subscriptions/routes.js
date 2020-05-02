import express from 'express';
import subscriptionCtrl from './controller';
import subscriptionHelper from './helper';
import userMiddl from '../users/middleware';
const app = express.Router();

// verification
app.post('/verification', subscriptionHelper.verificationSchema(), userMiddl.validator, subscriptionCtrl.verification);

export default app;
