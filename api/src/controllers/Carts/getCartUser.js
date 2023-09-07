const {Cart, Event} = require("../../db");


const getCartUser = async (id) => {

        
        const cart = await Cart.findOne({
            where:{
                idUser: id,
                active: true
            },    
            include: {
                        model: Event, 
                        attributes: ["id", "ticketPrice", "name", "cantTickets"], 
                        through:{attributes:["quantity"]}
                }});

        return cart;

    
};

module.exports = getCartUser;