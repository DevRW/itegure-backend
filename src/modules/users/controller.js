import response from '../generates/response';
import userService from './service';
import { or } from 'sequelize';
import generateHelper from '../generates/generate';
import { config } from 'dotenv';
import userHelper from './helper';
config();
const { SECRET_OR_KEY } = process.env;
export class UserCtrl {
  async createAccount(req, res) {
    try {
      const { username, email, phoneNumber } = req.body;
      const verifyUsername = await userService.findOne({ where: { username } });
      const verifyEmail = await userService.findOne({ where: { email } });
      const verifyPhoneNumber = await userService.findOne({ where: { phoneNumber } });
      if (verifyUsername) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'username already taken', param: 'username' }),
        });
      }
      if (verifyEmail) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'email already exist', param: 'email' }),
        });
      }
      if (verifyPhoneNumber) {
        return response.errorResponse({
          res,
          status: 409,
          data: response.customValidationMessage({ msg: 'phone number already used', param: 'phoneNumber' }),
        });
      }
      // save new user
      const newUser = await userService.register(req.body);
      return response.successResponse({ res, status: 201, data: newUser });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something went wrong, try again'),
      });
    }
  }
  /**
   * login to user account
   */
  async login(req, res) {
    try {
      const { password, email } = req.body;
      const unauthorizedMessage = 'the provided information are incorrect';
      const find = await userService.findOne({ where: or({ email }, { phoneNumber: email }) });
      if (find) {
        const { username, roles } = find;
        const comparePassword = generateHelper.decryptPassword({ hash: find.password, password });
        if (!comparePassword) {
          return response.errorResponse({ res, status: 401, data: response.authError(unauthorizedMessage) });
        }
        // generate token
        const token = generateHelper.generateToken({
          secret: SECRET_OR_KEY,
          payload: userHelper.userAuthPayload(find),
          time: '5h',
        });
        return response.successResponse({
          res,
          status: 200,
          data: {
            message: `welcome back ${username}`,
            token,
            roles,
          },
        });
      } else {
        return response.errorResponse({ res, status: 401, data: response.authError(unauthorizedMessage) });
      }
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('something went wrong, try again'),
      });
    }
  }

  async updateInformation(req, res) {
    try {
      const { id } = req.user;
      const change = await userService.updateInformation(req.body, id);
      return response.successResponse({ res, status: 200, data: change });
    } catch (error) {
      return response.errorResponse({
        res,
        status: 500,
        data: response.serverError('an error occured while updating information'),
      });
    }
  }
}
export default new UserCtrl();
