const {Cart} = require("../../db");


const getCart = async () => {


        const cart = await Cart.findAll();

        return cart;

    
};

module.exports = getCart;