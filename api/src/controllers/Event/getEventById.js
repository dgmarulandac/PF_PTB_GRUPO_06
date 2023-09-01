const { Event } = require("../../db");

const getEventById = async (id) => {
    const event = await Event.findByPk(id);
    return event;
};

module.exports = getEventById;
