const { Event } = require("../../db");

const getAdminEvents = async () => {

    const events = Event.findAll();
    return events;

};

module.exports = getAdminEvents;