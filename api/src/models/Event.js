const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Event', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
          },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        hour: {
            type: DataTypes.TIME(6),
            allowNull: false,
        },

        seats: {
            type: DataTypes.STRING,
                    },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        country: {
            type: DataTypes.ENUM('Colombia', 'Venezuela', 'Argentina', 'Uruguay'),
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        eventType:{
            type: DataTypes.ENUM('Musical', 'Deportivo', 'Artistico', 'Otro'),
            allowNull: false,

        }
    });
};