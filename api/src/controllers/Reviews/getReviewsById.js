const { Review, User } = require("../../db");

const getReviewById = async (id) => {

   
    const reviews =  await Review.findAll({
        where: {
            approved: true,
            idEvent: id
        },
        include: [
            {
                model: User, 
                attributes: ['name', 'displayName'], 
            }
        ]
    })


    return reviews;
};

module.exports = getReviewById;