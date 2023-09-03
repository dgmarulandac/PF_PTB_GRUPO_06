const { Order, Sale, Event, Order_Event } = require('../../db');

const getDashboardUser = async (id) => {
    try {
        const orders = await Order.findAll({
            where: { idBuyer: id },
            attributes: ['quantity', 'price', 'createdAt'],
            include: [
                { model: Sale, required: true, attributes: [] }, // false para que tome la venta aun sin que tenga que volver al sitio
                {
                    model: Order_Event, required: true,
                    attributes: ['quantity','price'],
                    include: [{model: Event, required: true, attributes: ["name", "date", "hour", "address", "image", "currency"]}]
                }

            ]
        });
        return orders;
    } catch (error) {
        throw error.message;
    }
};

module.exports = getDashboardUser;