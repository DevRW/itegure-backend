import model from '../../database/models';
const { subject } = model;

export class subjectServices {
  async register(data) {
    await subject.create(data);
    return {
      message: 'Subject Successfully created.',
    };
  }
  async findOne(query) {
    const find = await subject.findOne(query);
    return find;
  }
  async findAllSubjects() {
    const find = await subject.findAll({ order: [['id', 'DESC']] });
    return find;
  }
  async updateSubject(value, query) {
    await subject.update(value, query);
    return { message: 'Subject Successfully Updated.' };
  }
  async deleteSubject(query) {
    await subject.destroy(query);
    return { message: 'Subject Successfully Deleted.' };
  }
}

export default new subjectServices();
