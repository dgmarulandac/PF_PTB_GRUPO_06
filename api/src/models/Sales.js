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
            type: DataTypes.UUID,
            allowNull:false
        },

        paymentMethod: {
           type:DataTypes.STRING,
           allowNull:false,

        }

    });
};