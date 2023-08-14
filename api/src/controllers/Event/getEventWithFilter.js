const { Event } = require("../../db");
const { Op } = require('sequelize');


const getEventWithFilter = async(name, eventType, country, date)=> {
    const whereClause = {};

    if (name) {
        whereClause.name = { [Op.like]:`%${name}%` };
    }
    if (eventType) {
        whereClause.eventType = eventType;
    }
    if (country) {
        whereClause.country = country;
    }
    if (date) {
        whereClause.date = {[Op.eq]:date};
    }

    const events = await Event.findAll({
        where:whereClause,
            });
    return events;
    };


module.exports = getEventWithFilter;


