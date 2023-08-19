const { Orders } = require("../../db");

const getOrdertById = async (id) => {
    const order = await Orders.findByPk(id);
    return order;
};

module.exports = getOrdertById;