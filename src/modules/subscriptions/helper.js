import { check } from 'express-validator';
export class SubscriptionHelper {
  schema() {
    return {
      phoneSchema: check('phoneNumber')
        .notEmpty()
        .isLength({ min: 10, max: 10 })
        .isNumeric()
        .withMessage('phone number must be 10 numbers'),
      nameSchema: check('name').notEmpty().withMessage('name is required'),
      codeSchema: check('code')
        .notEmpty()
        .isLength({ min: 5, max: 5 })
        .isNumeric()
        .withMessage('code must be 5 numbers'),
    };
  }

  verificationSchema() {
    const { phoneSchema } = this.schema();
    return [phoneSchema];
  }

  createSchema() {
    const { phoneSchema, nameSchema } = this.schema();
    return [nameSchema, phoneSchema];
  }

  authenticateSchema() {
    const { phoneSchema, codeSchema } = this.schema();
    return [codeSchema, phoneSchema];
  }
}
export default new SubscriptionHelper();
