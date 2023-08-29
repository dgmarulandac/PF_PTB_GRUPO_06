const { Event, Review } = require("../../db");

const getEventById = async (id) => {
    const event = await Event.findByPk(id,{include:[{model:Review}]});
    return event;
};

module.exports = getEventById;