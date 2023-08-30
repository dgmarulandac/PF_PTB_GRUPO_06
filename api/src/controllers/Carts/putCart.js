const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const {Cart, Event, Cart_Event} = require("../../db");



const updateCartQuantity = async (req, res) => {
    try {
        const { token, eventId, newQuantity } = req.body;

        
        const decoded = jwt.verify(token, SECRET);
        const userId = decoded.id;

        // Encontrar el carrito del usuario
        const cart = await Cart.findOne({ where: { idUser: userId } });

        if (!cart) {
            return res.status(404).json({message: 'Carrito no encontrado' });
        }

        
        const cartEvent = await Cart_Event.findOne({
            where: { idCart: cart.id, idEvent: eventId }
        });

        if (!cartEvent) {
            return res.status(404).json({message: 'Evento no encontrado en el carrito' });
        }

       
        await cartEvent.update({ quantity: newQuantity });

        return res.status(200).json({message: 'Cantidad actualizada en el carrito' });
    } catch (error) {
        return res.status(500).json({error: error.message });
    }
};

module.exports = updateCartQuantity;
