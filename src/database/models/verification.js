export const verificationStatus = ['PENDING', 'USED'];
export default (Sequelize, DataType) => {
  return Sequelize.define(
    'verification',
    {
      verificationId: { type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      phoneNumber: { type: DataType.STRING, allowNull: false },
      code: { type: DataType.INTEGER, allowNull: false },
      status: {
        type: DataType.STRING(DataType.ENUM(verificationStatus)),
        allowNull: false,
        defaultValue: verificationStatus[0],
      },
    },
    {}
  );
};
