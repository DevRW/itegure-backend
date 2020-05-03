import { check } from 'express-validator';
export class StudentHelper {
  schema() {
    return {
      nameSchema: check('name').notEmpty().isLength({ min: 4 }).withMessage('name must atleast contains 4 characters'),
      subjectSchema: check('subject').notEmpty().withMessage('subject is required'),
      classSchema: check('classStudy').notEmpty().withMessage('class is required'),
    };
  }
  addStudent() {
    const { nameSchema, classSchema, subjectSchema } = this.schema();
    return [nameSchema, classSchema, subjectSchema];
  }
}
export default new StudentHelper();
