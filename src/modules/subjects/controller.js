import response from '../generates/response';
import subjectService from './service';

export class SubjectController {
  async createSubject(req, res) {
    try {
      let { name } = req.body;
      const trimedName = name.toLowerCase().trim();
      const newSubject = await subjectService.register({
        name: trimedName,
      });
      return response.successResponse({ res, status: 201, data: newSubject });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async viewAllSubject(req, res) {
    try {
      const viewSubjects = await subjectService.findAllSubjects();
      return response.successResponse({ res, status: 200, data: viewSubjects });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async updateSubject(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateSubject = await subjectService.updateSubject({ name }, { where: { id } });

      return response.successResponse({ res, status: 200, data: updateSubject });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async deleteSubject(req, res) {
    try {
      const { id } = req.params;
      const deletedSubject = await subjectService.deleteSubject({
        where: {
          id,
        },
      });
      return response.successResponse({ res, status: 200, data: deletedSubject });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }
}
