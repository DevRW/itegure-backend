export const notificationStatus = ['READ', 'UNREAD'];
export default (Sequelize, DataType) => {
  const Notification = Sequelize.define(
    'notification',
    {
      notificationId: { type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      message: { type: DataType.TEXT, allowNull: false },
      timetableId: { type: DataType.INTEGER, allowNull: false, references: { model: 'timetable', key: 'id' } },
      subscriberId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: { model: 'subscription', key: 'subscriptionId' },
      },
      status: {
        type: DataType.STRING(DataType.ENUM(notificationStatus)),
        allowNull: false,
        defaultValue: notificationStatus[1],
      },
    },
    {}
  );
  Notification.associate = (model) => {
    Notification.belongsTo(model.subscription, { foreignKey: 'subscriberId', as: 'subscription' });
    Notification.belongsTo(model.timetable, { foreignKey: 'timetableId', as: 'timetable' });
  };
  return Notification;
};
