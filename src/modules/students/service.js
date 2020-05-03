import models from '../../database/models';
import { and } from 'sequelize';

const { student } = models;

export class StudentService {
  async assignStudent(data) {
    const { subscriberId, name, classStudy, school } = data;
    await student.create({ subscriberId, name, classId: classStudy, school });
    return {
      message: 'action performed successfully.',
    };
  }
  async removeStudent(studentId, subscriberId) {
    await student.destroy({ where: and({ subscriberId }, { studentId }) });
    return {
      message: 'deleted successfully',
    };
  }

  async updateStudent(studentId, subscriberId, data) {
    const { name, school, classStudy } = data;
    await student.update({ name, school, classId: classStudy }, { where: and({ studentId }, { subscriberId }) });
    return {
      message: 'updated successfully',
    };
  }

  async findStudent(studentId) {
    const find = await student.findOne({ where: { studentId } });
    return find;
  }
  async findOne(query) {
    return await student.findOne(query);
  }
}
export default new StudentService();
