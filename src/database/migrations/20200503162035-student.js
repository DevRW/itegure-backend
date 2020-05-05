export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      studentId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      school: { type: Sequelize.STRING },
      subscriberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classId: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now() },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  },
};
