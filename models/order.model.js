//Database
const {db, DataTypes} = require('../utils/database.util');

//Creating our model (table) Order
const Order = db.define('oder', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
});

module.exports = { Order }