const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Sale', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        idOrder:{
            type: DataTypes.INTEGER,
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
      
        
        pasarelaId: {
            type: DataTypes.INTEGER,
            allowNull:false
        }


    });
};