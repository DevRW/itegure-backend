import response from '../generates/response';
import classStudyService from './service';
export class ClassStudiesMiddleware {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async checkIfClassExist(req, res, next) {
    try {
      const { id, studentId, classStudy } = req.params;
      const createStudentUrl = '/api/v1/students/create-student';
      const updateStudentUrl = `/api/v1/students/update-student/${studentId}`;
      const createTimeTableUrl = '/api/v1/timetable';
      const updateTimeTableUrl = `/api/v1/timetable/${id}`;
      const manageURL =
        req.originalUrl === createStudentUrl ||
        req.originalUrl === updateStudentUrl ||
        req.originalUrl === createTimeTableUrl ||
        req.originalUrl === updateTimeTableUrl
          ? req.body.classStudy
          : id;
      const verifyId = await classStudyService.findOne({ where: { id: manageURL } });
      if (!verifyId) {
        return response.errorResponse({
          res,
          status: 400,
          data: response.customValidationMessage({
            msg: 'Class could not be found',
            param:
              req.originalUrl === createStudentUrl ||
              req.originalUrl === updateStudentUrl ||
              req.originalUrl === createTimeTableUrl ||
              req.originalUrl === updateTimeTableUrl
                ? 'classStudy'
                : 'id',
          }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }
  async checkIfClassNameExist(req, res, next) {
    try {
      const { name } = req.body;
      const trimedName = name.toUpperCase().trim();
      const verifyName = await classStudyService.findOne({ where: { name: trimedName } });
      if (verifyName) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'Class already exist', param: 'name' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }
}

export default new ClassStudiesMiddleware();
