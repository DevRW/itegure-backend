import response from '../generates/response';
import classStudyService from './service';

export class ClassStudiesController {
  async createClass(req, res) {
    try {
      const { name } = req.body;
      const trimedName = name.toUpperCase().trim();
      const newClass = await classStudyService.register({ name: trimedName });
      return response.successResponse({ res, status: 201, data: newClass });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async viewAllClasses(req, res) {
    try {
      const viewClasses = await classStudyService.findAllclasses();
      return response.successResponse({ res, status: 200, data: viewClasses });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async updateClass(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateClass = await classStudyService.updateClass({ name }, { where: { id } });

      return response.successResponse({ res, status: 200, data: updateClass });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async deleteClass(req, res) {
    try {
      const { id } = req.params;
      const deletedClass = await classStudyService.deleteClass({
        where: {
          id,
        },
      });
      return response.successResponse({ res, status: 200, data: deletedClass });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }
}
