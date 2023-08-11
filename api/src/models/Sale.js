const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Sale', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        idSeller:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },

        idBuyer:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },

        currency:{
            type: DataTypes.ENUM('COP'),
            allowNull:false
        },

        paymentMethod: {
           type:DataTypes.STRING,
           allowNull:false,

        },

        quantity: {
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        price: {
            type:DataTypes.INTEGER,
            allowNull:false,

        },
        idEvent: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false
        }



    });
};