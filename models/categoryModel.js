const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsTo(models.Business, {
                foreignKey: 'businessID',
                as: 'business'
            });
            Category.hasMany(models.Product, {
                foreignKey: 'categoryID',
                as: 'products'
            });
        }
    }
    
    Category.init({
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        paranoid: true,
        timestamps: true
    }); 

    return Category;
}
