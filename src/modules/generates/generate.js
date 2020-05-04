import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import codeGenerator from 'node-code-generator';
import twilio from 'twilio';
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

  async generateMessage({ body, from, to }) {
    const { TWILIO_SID, TWILIO_AUTH_TOKEN } = process.env;
    const accountSid = TWILIO_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const send = await client.messages.create({ body, from, to });
    return send;
  }
}
export default new Generate();
