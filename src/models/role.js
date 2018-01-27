const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  }, {
    updatedAt: false,
    createdAt: false,
  });
  return Role;
};
