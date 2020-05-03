import { check } from 'express-validator';

export class SubjectStudiesHelper {
  /**
   * define all user schema validation and return them
   */
  schemaValidation() {
    return {
      nameSchema: check('name')
        .notEmpty()
        .isLength({ min: 2, max: 15 })
        .withMessage('name must be between 4 to 15 chars'),
    };
  }
  // subject validation schema
  subjectSchemas() {
    const { nameSchema } = this.schemaValidation();
    return [nameSchema];
  }
}

export default new SubjectStudiesHelper();
