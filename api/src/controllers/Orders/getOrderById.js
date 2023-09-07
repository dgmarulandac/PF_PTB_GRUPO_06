const { Order } = require("../../db");

const getOrderById = async (id) => {
    const order = await Order.findByPk(id);
    return order;
};

module.exports = getOrderById;