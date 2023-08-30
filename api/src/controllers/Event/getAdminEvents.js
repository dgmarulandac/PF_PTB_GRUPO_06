const { Event } = require("../../db");

const getAdminEvents = async (idSeller, idAuth) => {
    if( idSeller !== idAuth ) {
        throw Error("Esta intentando sacar los eventos que no le pertenecen.");
    }

    const events = Event.findAll({ where: {
        idSeller: idSeller
    } });

    return events;

};

module.exports = getAdminEvents;