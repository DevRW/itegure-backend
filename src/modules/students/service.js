import models from '../../database/models';
import { and } from 'sequelize';

const { student } = models;

export class StudentService {
  async assignStudent(data) {
    const { subscriberId, name, subject, classStudy, school } = data;
    await student.create({ subscriberId, name, subjectId: subject, classId: classStudy, school });
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
    const { name, school } = data;
    await student.update({ name, school }, { where: and({ studentId }, { subscriberId }) });
    return {
      message: 'updated successfully',
    };
  }

  async findStudent(studentId) {
    const find = await student.findOne({ where: { studentId } });
    return find;
  }
}
export default new StudentService();
