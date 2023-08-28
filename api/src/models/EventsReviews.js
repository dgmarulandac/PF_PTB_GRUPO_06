const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('EventsReviews', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey : true
          },
        
        reviewId: {
            type:DataTypes.UUID,
            allowNull: false
        },
        
        eventId: {
            type:DataTypes.UUID,
            allowNull: false,
        }

    });

   
};
