const { Sale, Order, Event, User, Order_Event } = require("../../db");

const getSaleById = async (id) => {
    const sale = await Sale.findByPk(id);

    if( !sale ) {
        throw Error("No se encuentra la venta");
    }

    const order = await Order.findByPk(sale.idOrder)
    const user = await User.findByPk(order.idBuyer);
    const events = await Order_Event.findAll({
        where: {
            idOrder: order.id
        }
    });

    let eventsToAdd = [];

    for( let i = 0; i < events.length; i++ ) {
        const event = await Event.findByPk(events[i].idEvent);
        const eventToAdd = {
            eventName: event.name,
            eventImage: event.image,
            price: events[i].price,
            quantity: events[i].quantity,
            currency: event.currency,
            date: event.date,
            hour: event.hour,
            address: event.address,
            country: event.country,
        }
        eventsToAdd.push(eventToAdd);
    }
    
    const response = {
        name: user.name,
        email: user.email,
        eventsToAdd,
        ...sale
    };

    return response;
};

module.exports = getSaleById;
