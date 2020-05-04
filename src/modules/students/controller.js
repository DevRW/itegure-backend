import response from '../generates/response';
import studentService from './service';

export class StudentControler {
  async assignStudent(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const create = await studentService.assignStudent({ ...req.body, subscriberId: subscriptionId });
      return response.successResponse({ res, status: 201, data: create });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something wrong please try again.'),
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const { studentId } = req.params;
      const remove = await studentService.removeStudent(studentId, subscriptionId);
      return response.successResponse({ res, status: 200, data: remove });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something wrong please try again.'),
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const { studentId } = req.params;
      const update = await studentService.updateStudent(studentId, subscriptionId, req.body);
      return response.successResponse({ res, status: 200, data: update });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something wrong please try again.'),
      });
    }
  }

  async findAllStudent(req, res) {
    try {
      const { subscriptionId } = req.subscriber;
      const find = await studentService.getAllStudentOfGivenParent(subscriptionId);
      return response.successResponse({ res, status: 200, data: find });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something wrong please try again.'),
      });
    }
  }
}
export default new StudentControler();
