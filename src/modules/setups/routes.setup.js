import express from 'express';
import users from '../users/routes';
import classes from '../classStudies/routes';
import stations from '../stations/routes';
const app = express.Router();

app.use('/api/v1/users', users);
app.use('/api/v1/classes', classes);
app.use('/api/v1/stations', stations);
export default app;
