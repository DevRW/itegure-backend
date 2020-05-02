export const userRoles = ['admin', 'manager'];
export default (Sequelize, DataType) => {
  const User = Sequelize.define(
    'user',
    {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      avatar: {
        type: DataType.STRING,
        allowNull: false,
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      roles: {
        type: DataType.ARRAY(DataType.ENUM(userRoles)),
        allowNull: false,
        defaultValue: [userRoles[1]],
      },
    },
    {}
  );
  return User;
};
