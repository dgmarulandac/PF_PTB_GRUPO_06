const { Event } = require("../../db");

const getMyEvents = async (idAuth) => {

    const events = await Event.findAll({ where: {
        idSeller: idAuth
    } });

    return events;

};

module.exports = getMyEvents;