import { validationResult } from 'express-validator';
import response from '../generates/response';
export class UserMiddleware {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  validator(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.errorResponse({ res, status: 422, data: response.validationError(errors.array()) });
      }
      next();
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('internal server error') });
    }
  }
}

export default new UserMiddleware();
