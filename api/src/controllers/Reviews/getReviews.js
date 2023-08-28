const {Review, Event} = require("../../db");
const getEventsReviewsById = require("../../controllers/Reviews/getEventReviewsById");


const getReviews = async () => {

    const eventsreviews = await getEventsReviewsById(id)
    const event = await Event.findByPk(eventsreviews.eventId)
    const review = await Review.findByPk(eventsreviews.reviewId)


    if(review.approved == true){
        const reviews = await Review.findAll({
            where: event.id,
        });
        return reviews;

    }
};

module.exports = getReviews;