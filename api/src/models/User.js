const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        identification:  {
            type: DataTypes.STRING
        },
        nationality: {
            type: DataTypes.ENUM('Colombia', 'Venezuela', 'Argentina', 'Uruguay', 'Chile')
        },
        isCompany: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};