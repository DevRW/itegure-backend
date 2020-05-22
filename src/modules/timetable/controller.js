import response from '../generates/response';
import timetableService from './service';
import notificationService from '../notifications/service';
import notificationCtrl from '../notifications/controller';

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
      const from = `${date} ${timeFrom}`;
      const to = `${date} ${timeTo}`;
      const updateTimetable = await timetableService.updateTimetable(
        { date, timeFrom: from, timeTo: to, subject, classStudy, station },
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
  async getAllUpcomingLessons(req, res) {
    try {
      const { classStudy } = req.params;
      const getLessons = await notificationService.notifyParent(classStudy);
      if (!getLessons.length) {
        return response.successResponse({
          res,
          status: 200,
          data: { message: 'No upcoming lessons. Try again letter' },
        });
      }
      const upcomingLessons = notificationCtrl.sendReminder(getLessons, false);
      return response.successResponse({ res, status: 200, data: upcomingLessons });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('an error occured, try again') });
    }
  }
}
