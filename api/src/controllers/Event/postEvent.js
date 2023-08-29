const {Event} = require('../../db.js');

const postEvent = async (event) => {

    const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency, idSeller } = event

    if (!name || !date || !hour || !cantTickets || !address || !country || !ticketPrice || !currency || !idSeller) {
        throw Error ("Faltan campos obligatorios");
    }

    const createdEvent = await Event.create({
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

    return createdEven;
};

module.exports = postEvent;