import { notificationStatus } from '../models/notification';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('notifications', {
      notificationId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      message: { type: Sequelize.TEXT, allowNull: false },
      timetableId: { type: Sequelize.INTEGER, allowNull: false, reference: { model: 'timetables', key: 'id' } },
      subscriberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'subscriptions', key: 'subscriptionId' },
      },
      status: {
        type: Sequelize.STRING(Sequelize.ENUM(notificationStatus)),
        allowNull: false,
        defaultValue: notificationStatus[1],
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('notificaions');
  },
};
