export default (Sequelize, DataTypes) => {
  const timetable = Sequelize.define(
    'timetable',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      timeFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'subject',
          key: 'id',
        },
      },
      classStudy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'classStudy',
          key: 'id',
        },
      },
      station: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'station',
          key: 'id',
        },
      },
    },
    {}
  );
  timetable.associate = (models) => {
    // associations can be defined here
    timetable.belongsTo(models.subject, { as: 'subjectKeyId', foreignKey: 'subject' });
    timetable.belongsTo(models.classStudy, { as: 'classStudyKeyId', foreignKey: 'classStudy' });
    timetable.belongsTo(models.station, { as: 'stationKeyId', foreignKey: 'station' });
  };
  return timetable;
};
