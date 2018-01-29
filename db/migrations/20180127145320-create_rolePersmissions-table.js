module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_permissions', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      route: Sequelize.STRING,
      method: Sequelize.ENUM('*', 'GET', 'POST', 'PUT', 'DELETE'),  
      roleId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'roles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('role_permissions');
  }
};
