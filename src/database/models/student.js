export default (Sequelize, DataType) => {
  const studentModel = Sequelize.define('student', {
    studentId: { type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING, allowNull: false },
    subscriberId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: 'subscription', key: 'subscriptionId' },
    },
    school: { type: DataType.STRING },
    subjectId: { type: DataType.INTEGER, allowNull: false, references: { model: 'subject', key: 'id' } },
    classId: { type: DataType.INTEGER, allowNull: false, references: { model: 'classStudy', key: 'id' } },
  });
  studentModel.associate = (models) => {
    studentModel.belongsTo(models.subscription, { foreignKey: 'subscriberId', as: 'parent' });
    studentModel.belongsTo(models.subject, { foreignKey: 'subjectId', as: 'subject' });
    studentModel.belongsTo(models.classStudy, { foreignKey: 'classId', as: 'class' });
  };
  return studentModel;
};
