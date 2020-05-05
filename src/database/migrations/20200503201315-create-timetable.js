export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('timetables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      timeFrom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeTo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classStudy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      station: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('timetables');
  },
};
