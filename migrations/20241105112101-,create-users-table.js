'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('businesses', {
      businessID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
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
    });

    await queryInterface.createTable('categories', {
      categoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });

    await queryInterface.addIndex('categories', ['businessID']);

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

    await queryInterface.addIndex('suppliers', ['businessID']); 

    await queryInterface.createTable('products', {
      productID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      categoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'categoryID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      supplierID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'suppliers',
          key: 'supplierID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    });

    await queryInterface.addIndex('products', ['categoryID', 'supplierID']);

    await queryInterface.createTable('users', {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
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

    await queryInterface.addIndex('users', ['businessID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('suppliers');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('businesses'); 
  },
};
