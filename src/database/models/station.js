export const stationType = ['Radio', 'Television'];
export default (Sequelize, DataTypes) => {
  const station = Sequelize.define(
    'station',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(stationType),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  station.associate = (models) => {
    // associations can be defined here
  };
  return station;
};
