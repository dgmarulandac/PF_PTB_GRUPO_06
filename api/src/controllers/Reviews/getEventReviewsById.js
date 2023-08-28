const {EventsReviews} = require("../../db");

const getEventsReviewsById = async (id) => {
    const eventsReviews = await EventsReviews.findByPk(id);
    return eventsReviews;
};

module.exports = getEventsReviewsById ;