const {Event} = require('../../db.js');

const postEvent = async (event) => {

    const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency, idSeller } = event

    if (!name || !date || !hour || !cantTickets || !address || !country || !ticketPrice || !currency || !idSeller) {
        throw Error ("Faltan campos obligatorios");
    }

    if( cantTickets <= 0 ) {
        throw Error("La cantidad de tickets debe ser mayor a 0.")
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

    return createdEvent;
};

module.exports = postEvent;