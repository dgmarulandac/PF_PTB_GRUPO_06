const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },

        idUser: {
            type: DataTypes.UUID,
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
})
}