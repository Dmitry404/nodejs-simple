const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
    roleId: Sequelize.INTEGER,
  }, {
    indexes: [{
      unique: true,
      fields: ['email'],
    }],
  });
  return User;
};
