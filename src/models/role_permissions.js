const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const RolePermission = sequelize.define('role_permissions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    route: Sequelize.STRING,
    method: Sequelize.ENUM('*', 'GET', 'POST', 'PUT', 'DELETE'),
  }, {
    updatedAt: false,
    createdAt: false,
  });
  return RolePermission;
};
