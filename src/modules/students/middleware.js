import response from '../generates/response';
import studentService from './service';

export class StudentMiddleware {
  async checkStudentId(req, res, next) {
    try {
      const { studentId } = req.params;
      const find = await studentService.findStudent(studentId);
      if (!find) {
        return response.errorResponse({ res, status: 404, data: response.notFoundError('student not found') });
      }
      next();
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something went wrong, try again later'),
      });
    }
  }
}
export default new StudentMiddleware();
