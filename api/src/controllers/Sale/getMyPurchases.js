const { Order, Sale, Event } = require('../../db');

const getMyPurchases = async (id) => {
    const orders = await Order.findAll({
        where: { idBuyer: id },
        attributes: ['id','createdAt'],
        include: [
            { model: Sale, required: true, attributes: ['isSuccesful'] },
            {
                model: Event, required: true,
                attributes: ["name", "date", "hour", "address", "image", "currency"],
                through: {
                    attributes: ['quantity','price']
                }
            }
        ]
    });
    return orders;
};

module.exports = getMyPurchases;