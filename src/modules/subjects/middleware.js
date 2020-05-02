import response from '../generates/response';
import subjectService from './service';
export class SubjectsMiddleware {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async checkIfSubjectExist(req, res, next) {
    try {
      const { id } = req.params;
      const verifyId = await subjectService.findOne({ where: { id } });
      if (!verifyId) {
        return response.errorResponse({
          res,
          status: 400,
          data: response.customValidationMessage({ msg: 'Subject could not be found', param: 'id' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }
  async checkIfSubjectNameExist(req, res, next) {
    try {
      const { name } = req.body;
      const trimedName = name.toLowerCase().trim();
      const verifyName = await subjectService.findOne({ where: { name: trimedName } });
      if (verifyName) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'The Subject already exist', param: 'name' }),
        });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('Something went wrong') });
    }
  }
}

export default new SubjectsMiddleware();