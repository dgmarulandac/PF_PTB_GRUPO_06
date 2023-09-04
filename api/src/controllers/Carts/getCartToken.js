const {Cart, Event} = require("../../db");
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const postCart = require("./postCart");
const getCartUser = require("./getCartUser");

const getCartToken = async (token, userId) => {
        
        let cartId = "";

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                throw Error ("Carrito no existe");
            }
            cartId= decoded.id;
        });

        let cart = await Cart.findByPk(cartId, {
            include: {
                model: Event,
                attributes: ["id", "ticketPrice", "name", "cantTickets"],
                through: { attributes: ["quantity"] }
            }
        });

        if( cart.idUser === null && userId ) {
            const posibleCart = getCartUser(userId);
            cart = posibleCart ? posibleCart : cart;
            cart.idUser = userId;
            cart.save();
        }

        if( !cart.active ) {
            cart = await postCart(userId, []);
        }
        
        return cart;

    
};

module.exports = getCartToken;