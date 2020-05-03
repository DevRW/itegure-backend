import { check } from 'express-validator';
export class StudentHelper {
  schema() {
    return {
      nameSchema: check('name').notEmpty().isLength({ min: 4 }).withMessage('name must atleast contains 4 characters'),
      classSchema: check('classStudy').notEmpty().withMessage('class is required'),
    };
  }
  addStudent() {
    const { nameSchema, classSchema } = this.schema();
    return [nameSchema, classSchema];
  }
}
export default new StudentHelper();
