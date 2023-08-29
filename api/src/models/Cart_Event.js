const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart_Event', {

        idEvent: {
            type: DataTypes.UUID,
            allowNull: false,
            
        },

        idCart: { 
            type: DataTypes.UUID,
            allowNull: false, 
        },

        quantity: { 
            type: DataTypes.STRING,
            defaultvalue: 1,
            allowNull: false, 
        }

     }) 
    }