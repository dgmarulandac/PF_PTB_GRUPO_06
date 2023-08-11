const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
        },
        type: {
            type: DataTypes.ENUM("Comprador","Vendedor","Administrador"),
            allowNull: false
        }
    });
};