import { check } from 'express-validator';

export class UserHelper {
  /**
   * define all user schema validation and return them
   */
  schemaValidation() {
    return {
      usernameSchema: check('username')
        .notEmpty()
        .isLength({ min: 4, max: 40 })
        .withMessage('username must be between 4 to 40 chars'),
      passwordSchema: check('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
      emailSchema: check('email').isEmail().withMessage('email must be email'),
      rolesSchema: check('roles')
        .isArray()
        .custom((value) => {
          return value.length !== 0;
        })
        .withMessage('select some of the provided types'),
    };
  }
  /**
   *  define signup schema and validate all signup field
   */
  signupSchemas() {
    const { usernameSchema, passwordSchema, emailSchema } = this.schemaValidation();
    const validation = [usernameSchema, passwordSchema, emailSchema];
    return validation;
  }
  /**
   *
   * @param {data} data
   */
  userAuthPayload(data) {
    const { id, username } = data;
    return {
      id,
      username,
    };
  }
  /**
   * update user information
   */
  updateInformation() {
    const { usernameSchema } = this.schemaValidation();
    return [usernameSchema];
  }
}

export default new UserHelper();
