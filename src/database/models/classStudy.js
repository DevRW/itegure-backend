export default (Sequelize, DataTypes) => {
  const classStudy = Sequelize.define(
    'classStudy',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  classStudy.associate = (models) => {
    // associations can be defined here
  };
  return classStudy;
};
