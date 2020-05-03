import { check } from 'express-validator';

export class ClassStudiesHelper {
  /**
   * define all user schema validation and return them
   */
  schemaValidation() {
    return {
      nameSchema: check('name')
        .notEmpty()
        .isLength({ min: 2, max: 15 })
        .withMessage('name must be between 2 to 15 chars'),
    };
  }
  // class validation schema
  postClass() {
    const { nameSchema } = this.schemaValidation();
    return [nameSchema];
  }
}

export default new ClassStudiesHelper();
