import model from '../../database/models';
const { classStudy } = model;

export class ClassStudyServices {
  async register(data) {
    await classStudy.create(data);
    return {
      message: 'Class Successfully created.',
    };
  }
  async findOne(query) {
    const find = await classStudy.findOne(query);
    return find;
  }
  async findAllclasses() {
    const find = await classStudy.findAll({
      attributes: ['id', 'name'],
    });
    return find;
  }
  async updateClass(value, query) {
    await classStudy.update(value, query);
    return { message: 'Class Successfully Updated.' };
  }
  async deleteClass(query) {
    await classStudy.destroy(query);
    return { message: 'Class Successfully Deleted.' };
  }
}

export default new ClassStudyServices();
