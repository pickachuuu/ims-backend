const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Business extends Model {
    static associate(models) {
      Business.hasMany(models.User, {
        foreignKey: 'businessID',
        as: 'users'
      });
    //   Business.hasMany(models.Category, {
    //     foreignKey: 'businessID',
    //     as: 'categories'
    //   });
      Business.hasMany(models.Supplier, {
        foreignKey: 'businessID',
        as: 'suppliers'
      });
    }
  }

  Business.init({
    businessID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses',
    timestamps: true
  });

  return Business;
};