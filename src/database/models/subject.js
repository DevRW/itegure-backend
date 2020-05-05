export default (Sequelize, DataTypes) => {
  const subject = Sequelize.define(
    'subject',
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
  subject.associate = (models) => {
    // associations can be defined here
    subject.hasMany(models.timetable, { foreignKey: 'subject', allowNull: false });
  };
  return subject;
};
