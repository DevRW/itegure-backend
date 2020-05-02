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
      const { id } = req.params;
      const verifyId = await classStudyService.findOne({ where: { id } });
      if (!verifyId) {
        return response.errorResponse({
          res,
          status: 400,
          data: response.customValidationMessage({ msg: 'Class could not be found', param: 'id' }),
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
