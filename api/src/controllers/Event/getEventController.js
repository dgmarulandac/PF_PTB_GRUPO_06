const { Event, User, Role, Sale } = require("../../db");
const { Op } = require('sequelize');


const getEventController = () => {
    return "debo mostrar todos los eventos";
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
    getEvent,
    searchById,
    searchByName
}


