import response from '../generates/response';
import stationService from './service';

export class StationController {
  async createStation(req, res) {
    try {
      let { name } = req.body;
      req.body.name = name.toLowerCase().trim();
      const newStation = await stationService.register(req.body);
      return response.successResponse({ res, status: 201, data: newStation });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async viewAllStations(req, res) {
    try {
      const viewStations = await stationService.findAllStations();
      return response.successResponse({ res, status: 200, data: viewStations });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async updateStation(req, res) {
    try {
      const { id } = req.params;
      const { name, type, description } = req.body;
      const updateStation = await stationService.updateStation({ name, type, description }, { where: { id } });

      return response.successResponse({ res, status: 200, data: updateStation });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }

  async deleteStation(req, res) {
    try {
      const { id } = req.params;
      const deletedStation = await stationService.deleteStation({
        where: {
          id,
        },
      });
      return response.successResponse({ res, status: 200, data: deletedStation });
    } catch (error) {
      return response.errorResponse({ res, status: 500, data: response.serverError('something wrong') });
    }
  }
}
