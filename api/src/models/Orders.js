const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Orders', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        idBuyer:{
            type: DataTypes.STRING,
            allowNull:false
        },

        

        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        },

        price: {
           type:DataTypes.INTEGER,
           allowNull:false,

        },
      
        
        idEvent: {
            type: DataTypes.STRING,
            allowNull:false
        },

        idMercadoPago: {
            type:DataTypes.STRING,
            allowNull:false
        }


    });
};