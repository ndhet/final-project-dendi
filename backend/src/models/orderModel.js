const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'customer_name',
    },
    merchantName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'merchant_name',
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiredDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'expired_date',
    },
    productSpecification: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'product_specification',
    },
    server: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'orders',
});

module.exports = Order;
