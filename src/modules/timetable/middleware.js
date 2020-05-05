import response from '../generates/response';
import timetableService from './service';
export class TimetableMiddleware {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async checkIfprogramExist(req, res, next) {
    try {
      const { id } = req.params;
      const verifyId = await timetableService.findOne({ where: { id } });
      if (!verifyId) {
        return response.errorResponse({
          res,
          status: 400,
          data: response.customValidationMessage({ msg: 'Program could not be found', param: 'id' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }

  async checkIftimetableExist(req, res, next) {
    try {
      const { date, timeFrom, timeTo, subject, classStudy, station } = req.body;
      const from = `${date} ${timeFrom}`;
      const to = `${date} ${timeTo}`;
      const verifyTimetable = await timetableService.findOne({
        where: { date, timeFrom: from, timeTo: to, subject, classStudy, station },
      });
      if (verifyTimetable) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'Timetable already exit!', param: 'id' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }
}

export default new TimetableMiddleware();
