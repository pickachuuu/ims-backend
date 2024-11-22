'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('suppliers', {
      supplierID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      supplierName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactNo: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: { 
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      businessID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'businesses',
          key: 'businessID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('suppliers');
  }
};
