export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      subscriptionId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      phoneNumber: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  },
};
