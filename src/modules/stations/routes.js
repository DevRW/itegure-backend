import express from 'express';
import { StationController } from './controller';
import authMiddl from '../auths/middleware';
import stationHelper from './helper';
import stationMiddleware from './middleware';
import requestValidator from '../users/middleware';

const app = express.Router();
const station = new StationController();
app.post(
  '/',
  authMiddl.isAuth,
  stationHelper.stationSchemas(),
  requestValidator.validator,
  stationMiddleware.checkIfStationNameExist,
  station.createStation
);
app.get('/', station.viewAllStations);
app.put(
  '/:id',
  authMiddl.isAuth,
  stationMiddleware.checkIfStationExist,
  stationHelper.stationSchemas(),
  requestValidator.validator,
  station.updateStation
);
app.delete('/:id', authMiddl.isAuth, stationMiddleware.checkIfStationExist, station.deleteStation);

export default app;
