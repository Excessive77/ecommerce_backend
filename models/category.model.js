//Database 
const {db, DataTypes} = require('../utils/database.util');

//Creating our model (table) Category
const Category = db.define('category', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    }
});

module.exports = { Category }