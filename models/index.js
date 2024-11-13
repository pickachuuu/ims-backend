'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Define models manually
const Business = require('./businessModel.js')(sequelize, Sequelize.DataTypes);
const User = require('./userModel.js')(sequelize, Sequelize.DataTypes);
const Product = require('./productModel.js')(sequelize, Sequelize.DataTypes);
// const Category = require('./categoryModel.js')(sequelize, Sequelize.DataTypes);
// const Supplier = require('./supplierModel.js')(sequelize, Sequelize.DataTypes);

// Add models to db object
db.Business = Business;
db.User = User;
db.Product = Product;
// db.Category = Category;
// db.Supplier = Supplier;

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;