export default (Sequelize, DataType) => {
  const Subscription = Sequelize.define(
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
  Subscription.associate = (models) => {
    Subscription.hasMany(models.student, { foreignKey: 'subscriberId', as: 'parent' });
  };
  return Subscription;
};
