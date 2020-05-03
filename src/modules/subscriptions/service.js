import models from '../../database/models';
import generate from '../generates/generate';
import { and } from 'sequelize';
import { verificationStatus } from '../../database/models/verification';
const { subscription, verification } = models;

export class SubscriptionService {
  async createVerificationCode(phoneNumber) {
    await verification.create({ phoneNumber, code: generate.generateCode() });
    return {
      message: 'code generated',
    };
  }
  async createSubscription(data) {
    await subscription.create(data);
    return {
      message: 'account created successfully',
    };
  }

  async findPendingVerificationCode(phoneNumber, code) {
    const find = await verification.findOne({
      where: and({ phoneNumber }, { code }, { status: verificationStatus[0] }),
    });
    return find;
  }

  async findOneSubscription(phoneNumber) {
    const find = await subscription.findOne({ where: { phoneNumber } });
    return find;
  }
}
export default new SubscriptionService();
