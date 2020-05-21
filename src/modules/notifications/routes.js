import express from 'express';
import notificationCtrl from './controller';
import authMiddl from '../auths/middleware';
import classMiddl from '../classStudies/middleware';

const app = express.Router();

// GET find all notification as subscriber
app.get('/read-sub-notification', authMiddl.isSubscriberAuth, notificationCtrl.getSubscriberNotification);

// GET find all notification as an admin or manager
app.get('/read-notification', authMiddl.isAuth, notificationCtrl.getAllNotification);

export default app;
