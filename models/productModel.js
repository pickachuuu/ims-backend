const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {
        static associate(models) {
            // Product belongs to Business
            Product.belongsTo(models.Business, {
                foreignKey: 'businessID',
                as: 'business'
            });

            // Product.belongsTo(models.Category, {
            //     foreignKey: 'categoryID',
            //     as: 'category'
            // });

            // Product.belongsTo(models.Supplier, {
            //     foreignKey: 'supplierID',
            //     as: 'supplier'
            // });
        }
    }

    Product.init({
        productID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        businessID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'businesses',
                key: 'businessID'
            }
        }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
        paranoid: true
    });

    return Product;
};