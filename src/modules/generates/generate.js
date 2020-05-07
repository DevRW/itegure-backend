import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import codeGenerator from 'node-code-generator';
import axios from 'axios';
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

  generateCode() {
    const generator = new codeGenerator();
    const code = generator.generateCodes('#+', 5);
    return `${code[0]}${code[1]}${code[2]}${code[3]}${code[4]}`;
  }

  subscriptionPayload(subscription) {
    const { subscriptionId, phoneNumber } = subscription;
    return {
      subscriptionId,
      phoneNumber,
    };
  }

  async generateMessage({ body, to }) {
    const { SMS_API_GATEWAY, SMS_SENDER_NAME, SMS_CLIENT, SMS_CLIENT_PASSWORD } = process.env;
    const randomNumber = Math.floor(Math.random() * 11000);
    const randomMsgId = `LN${randomNumber}`;
    const send = await axios.post(`${SMS_API_GATEWAY}`, {
      ohereza: `${SMS_SENDER_NAME}`,
      ubutumwa: `${body}`,
      msgid: `${randomMsgId}`,
      kuri: `${to}`,
      client: `${SMS_CLIENT}`,
      password: `${SMS_CLIENT_PASSWORD}`,
    });
    return send;
  }
}
export default new Generate();
