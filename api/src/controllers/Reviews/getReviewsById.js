const { Review } = require("../../db");

const getReviewById = async (id) => {
    const review = await Review.findByPk(id);
    return review;
};

module.exports = getReviewById;