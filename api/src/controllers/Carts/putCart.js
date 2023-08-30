const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const {Cart, Event, Cart_Event} = require("../../db");



const updateCartQuantity = async (req, res) => {
    try {
        const { token, eventId, newQuantity } = req.body;
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
                attributes: ["id"],
                through: { attributes: ["quantity"] }
            }
        });

        if (!cart) {
            return res.status(404).json({message: 'Carrito no encontrado' });
        }

        const cartEvent = await Cart_Event.findOne({
            where: { idEvent: eventId, idCart: cart.id }
        });

        await cartEvent.update({ quantity: newQuantity });

       
        return res.status(200).json({message: 'Cantidad actualizada en el carrito' });
    
    } catch (error) {
        
        return res.status(500).json({error: error.message });
    }
};

module.exports = updateCartQuantity;
