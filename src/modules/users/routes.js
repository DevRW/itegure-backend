import express from 'express';
import userCtrl from './controller';
const app = express.Router();

app.get('/', userCtrl.welcome);

export default app;
