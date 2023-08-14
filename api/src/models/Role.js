const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey : true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};