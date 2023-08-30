const { Review } = require("../../db");

const getReviewById = async (id) => {

   
    const reviews =  await Review.findAll({
        where: {
            approved: true,
            idEvent: id
        }
    })


    return reviews;
};

module.exports = getReviewById;