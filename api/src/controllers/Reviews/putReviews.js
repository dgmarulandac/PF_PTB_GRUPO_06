const {Review} = require("../../db");

const putReviews = async (id) => {

   
    const reviews =  await Review.findByPk(id)

    reviews.approved = !reviews.approved

    reviews.save()

    return reviews;
};

module.exports = putReviews;