const { Order } = require("../../db");

const getOrdertById = async (id) => {
    const order = await Order.findByPk(id);
    return order;
};

module.exports = getOrdertById;