import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class Generate {
  /**
   *
   * @param {value} value
   * hash password
   */
  encryptPassword(value) {
    const password = bcrypt.hashSync(value);
    return password;
  }
  /**
   *
   * @param {secret} secret of token
   * @param {payload} information
   * @param {time} time token will expire
   */
  generateToken({ secret, payload, time }) {
    const token = jwt.sign(payload, secret, { expiresIn: time });
    return token;
  }
  /**
   *
   * @param {hash} hashed password
   * @param {password} password
   */
  decryptPassword({ hash, password }) {
    const decrypt = bcrypt.compareSync(password, hash);
    return decrypt;
  }
}
export default new Generate();
