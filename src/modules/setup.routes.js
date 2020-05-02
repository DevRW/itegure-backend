import express from 'express';
import users from './users/routes';
const app = express.Router();

app.use('/api/v1/users', users);
export default app;
