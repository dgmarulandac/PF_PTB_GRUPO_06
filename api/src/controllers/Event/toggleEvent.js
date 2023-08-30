const {Event} = require('../../db.js');

const toggleEvent = async (id, data) => {
    let event = await Event.findByPk(id);

    if( !event ) {
        throw Error("El evento no existe");
    }

    const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency, idSeller, active } = data

    if( cantTickets <= 0 ) {
        throw Error("La cantidad de boletas debe ser mayor o igual a 0.")
    }

    let updatedEvent = await event.update({ name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency, idSeller, active });

    return updatedEvent;
    
};

module.exports = toggleEvent;