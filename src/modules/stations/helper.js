import { check } from 'express-validator';

export class StationHelper {
  /**
   * define all user schema validation and return them
   */
  schemaValidation() {
    return {
      nameSchema: check('name')
        .notEmpty()
        .isLength({ min: 4, max: 40 })
        .withMessage('name must be between 4 to 40 chars'),
      typeSchema: check('type').notEmpty().withMessage('select one of the provided types'),
    };
  }
  /**
   *  define station schema and validate all station field
   */
  stationSchemas() {
    const { nameSchema, typeSchema } = this.schemaValidation();
    const validation = [nameSchema, typeSchema];
    return validation;
  }
}

export default new StationHelper();
