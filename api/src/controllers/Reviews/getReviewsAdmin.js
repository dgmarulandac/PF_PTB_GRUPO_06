const {Review, Event} = require("../../db");


const getReviews = async () => {


        const reviews = await Review.findAll();

        return reviews;

    
};

module.exports = getReviews;