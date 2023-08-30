const { Order, Sale, Event } = require('../../db');

const getDashboardUserController = async (id) => {
    try {
        const orders = await Order.findAll({
            where: { idBuyer: id },
            include: [
                { model: Sale, required: false }, // false para que tome la venta aun sin que tenga que volver al sitio
                { model: Event, required: true }
            
            ]
        });
        
        return orders;
    } catch (error) {
        return error;
    }

};

module.exports = getDashboardUserController;