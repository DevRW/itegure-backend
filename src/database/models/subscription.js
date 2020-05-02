export default (Sequelize, DataType) => {
  return Sequelize.define(
    'subscription',
    {
      subscription_id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataType.STRING, allowNull: false },
      phoneNumber: { type: DataType.INTEGER, allowNull: false },
    },
    {}
  );
};
