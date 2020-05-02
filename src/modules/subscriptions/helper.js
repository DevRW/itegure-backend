import { check } from 'express-validator';
export class SubscriptionHelper {
  schema() {
    return {
      phoneSchema: check('phoneNumber')
        .notEmpty()
        .isLength({ min: 10, max: 10 })
        .withMessage('phone number must be 10 characted'),
      name: check('name').notEmpty().withMessage('name is required'),
    };
  }

  verificationSchema() {
    const { phoneSchema } = this.schema();
    return [phoneSchema];
  }
}
export default new SubscriptionHelper();
