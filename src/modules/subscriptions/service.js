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
    const create = await subscription.create(data);
    return {
      message: 'account created successfully',
      subscription: create,
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

  async updateVerificationCode(code, phoneNumber) {
    await verification.update({ status: verificationStatus[1] }, { where: and({ phoneNumber }, { code }) });
    return {
      message: 'updated successfully',
    };
  }
  async findBySubscriptionId(subscriptionId) {
    const find = await subscription.findOne({ where: { subscriptionId } });
    return find;
  }
}
export default new SubscriptionService();
