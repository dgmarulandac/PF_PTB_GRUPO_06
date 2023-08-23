const { Sale } = require("../../db");

const getSaleById = async (id) => {
    const sale = await Sale.findByPk(id);
    return sale;
};

module.exports = getSaleById;
