const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Order_Event', {

        idEvent: {
            type: DataTypes.UUID,
            allowNull: false,
            
        },
        
        quantity: { 
            type: DataTypes.INTEGER,
            allowNull: false, 
        },

        price: { 
            type: DataTypes.DOUBLE,
            allowNull: false, 
        },

        idOrder: { 
            type: DataTypes.UUID,
            allowNull: false, 
        },


     }) 
    }