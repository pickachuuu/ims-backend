const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Supplier extends Model {
        static associate(models) {
            Supplier.belongsTo(models.Business, {
                foreignKey: 'businessID',
                as: 'business'
            });
        }
    }

    Supplier.init({
        supplierID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Supplier',
        tableName: 'suppliers',
        timestamps: true,
        paranoid: true
    });
    
    return Supplier;
}

