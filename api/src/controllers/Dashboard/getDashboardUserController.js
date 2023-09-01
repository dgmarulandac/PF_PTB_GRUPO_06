const { Order, Sale, Event } = require('../../db');

const getDashboardUser = async (id) => {
    try {
        const orders = await Order.findAll({
            where: { idBuyer: id },
            attributes: ['quantity', 'price', 'createdAt'],
            include: [
                { model: Sale, required: true, attributes: [] }, // false para que tome la venta aun sin que tenga que volver al sitio
                {
                    model: Event, required: true,
                    attributes: ['name', 'date', 'hour', 'image', 'address', 'country', 'ticketPrice', 'currency']
                }

            ]
        });
        return orders;
    } catch (error) {
        throw error.message;
    }
};

module.exports = getDashboardUser;