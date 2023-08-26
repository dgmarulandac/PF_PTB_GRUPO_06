const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Review', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        score: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },

        comment: {
            type:DataTypes.STRING(1234),
            allowNull: false,
        },

        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        userId: {
            type:DataTypes.UUID,
            allowNull: false,
        }


        
    });
};