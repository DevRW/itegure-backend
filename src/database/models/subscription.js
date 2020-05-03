export default (Sequelize, DataType) => {
  return Sequelize.define(
    'subscription',
    {
      subscriptionId: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataType.STRING, allowNull: false },
      phoneNumber: { type: DataType.STRING, allowNull: false },
    },
    {}
  );
};
