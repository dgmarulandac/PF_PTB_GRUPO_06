const {Event} = require('../db.js');

const postEvent = async (event) => {

    const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency, idSeller } = event

    if (!name || !date || !hour || !cantTickets || !address || !country || !ticketPrice || !currency || !idSeller) {
        throw Error ("Faltan campos obligatorios");
    }

    const event = await Event.create({
        name, 
        description, 
        date,
        hour, 
        cantTickets,  
        address,
        country,
        image,
        eventType,
        ticketPrice,
        currency,
        idSeller
    });

    return event;
};

module.exports = postEvent;