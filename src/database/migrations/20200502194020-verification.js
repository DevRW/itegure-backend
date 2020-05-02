import { verificationStatus } from '../models/verification';
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verifications', {
      verificationId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      code: { type: Sequelize.INTEGER, allowNull: false },
      phoneNumber: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.STRING(Sequelize.ENUM()), allowNull: false, defaultValue: verificationStatus[0] },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('verifications');
  },
};
