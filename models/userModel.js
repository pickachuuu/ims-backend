const { Model, DataTypes } = require('sequelize');
const { hashPassword } = require('../utils/passwordUtils');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {  
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {   
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
      defaultValue: '0',
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await hashPassword(user.password);
      }
    }
  });

  return User;
};