import model from '../../database/models';
const { station } = model;

export class stationServices {
  async register(data) {
    await station.create(data);
    return {
      message: 'Station Successfully created.',
    };
  }
  async findOne(query) {
    const find = await station.findOne(query);
    return find;
  }
  async findAllStations() {
    const find = await station.findAll();
    return find;
  }
  async updateStation(value, query) {
    await station.update(value, query);
    return { message: 'Station Successfully Updated.' };
  }
  async deleteStation(query) {
    await station.destroy(query);
    return { message: 'Station Successfully Deleted.' };
  }
}

export default new stationServices();
