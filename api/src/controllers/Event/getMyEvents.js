const { Event } = require("../../db");

const getMyEvents = async (idAuth) => {

    const events = Event.findAll({ where: {
        idSeller: idAuth
    } });

    return events;

};

module.exports = getMyEvents;