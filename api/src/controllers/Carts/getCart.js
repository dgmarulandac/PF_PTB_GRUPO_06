const {Cart, Event} = require("../../db");


const getCart = async () => {


        const cart = await Cart.findAll({
                include: {
                        model: Event, 
                        attributes: ["id"], 
                        through:{attributes:["quantity"]}
                }});

        return cart;

    
};

module.exports = getCart;