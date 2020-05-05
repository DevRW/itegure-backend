import response from '../generates/response';
import timetableService from './service';

export class TimetableController {
  async createTimetable(req, res) {
    try {
      const { date, timeFrom, timeTo, subject, classStudy, station } = req.body;
      const newTimetable = await timetableService.register({
        date,
        timeFrom,
        timeTo,
        subject,
        classStudy,
        station,
      });
      return response.successResponse({ res, status: 201, data: newTimetable });
    } catch (error) {
      console.log(error);
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async viewTimetable(req, res) {
    try {
      const viewTimetable = await timetableService.findAllTimetable();
      return response.successResponse({ res, status: 200, data: viewTimetable });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async updateTimetable(req, res) {
    try {
      const { id } = req.params;
      const { date, timeFrom, timeTo, subject, classStudy, station } = req.body;
      const updateTimetable = await timetableService.updateTimetable(
        { date, timeFrom, timeTo, subject, classStudy, station },
        { where: { id } }
      );

      return response.successResponse({ res, status: 200, data: updateTimetable });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async deleteTimetable(req, res) {
    try {
      const { id } = req.params;
      const deletedTimetable = await timetableService.deleteTimetable({
        where: {
          id,
        },
      });
      return response.successResponse({ res, status: 200, data: deletedTimetable });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }
}
