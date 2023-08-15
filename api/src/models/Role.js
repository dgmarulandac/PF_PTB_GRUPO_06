const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey : true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};