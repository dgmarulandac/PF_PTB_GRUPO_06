const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        idBuyer:{
            type: DataTypes.UUID,
            allowNull:false
        },

        idMercadoPago: {
            type:DataTypes.STRING,
            allowNull:false
        }
    });
};