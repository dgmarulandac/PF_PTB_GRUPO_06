const { Event, User, Role, Sale } = require("../../db");
const { Op } = require('sequelize');


const getEventController = async(name, eventType, country, date)=> {
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




const searchById = () => {
    return "aqui traigo un evento por id";
};

const searchByName = async (name) => {
    const eventName = await Event.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }
    })
    if (eventName.length) return eventName;
    throw Error('The event was not found');
};

module.exports = {
    getEventController,
    searchById,
    searchByName
}


