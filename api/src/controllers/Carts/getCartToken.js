const {Cart, Event} = require("../../db");
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;



const getCartToken = async (token) => {
        
        let cartId = "";

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                throw Error ("Carrito no existe");
            }
            cartId= decoded.id;
        });

        const cart = await Cart.findByPk(cartId, {
            include: {
                model: Event,
                attributes: ["id", "ticketPrice", "name"],
                through: { attributes: ["quantity"] }
            }
        });
        
        return cart;

    
};

module.exports = getCartToken;