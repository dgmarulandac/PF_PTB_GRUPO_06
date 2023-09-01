const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const {Cart, Event, Cart_Event} = require("../../db");



const updateCartQuantity = async (req, res) => {
    try {
        const { token, events} = req.body;
        const id = req.id;

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
                attributes: ["id"],
                through: { attributes: ["quantity"] }
            }
        });

        if (!cart) {
            return res.status(404).json({message: 'Carrito no encontrado' });
        }
        if(id){
            cart.idUser = id;
            cart.save();
        }
        
        for(let i=0; i<events.length; i++){
            
            const cartEvent = await Cart_Event.findOne({
                where: { idEvent: events[i].idEvent, idCart: cart.id }
            });
            if(cartEvent){

                await cartEvent.update({ quantity: events[i].quantity});

            }else{

                await Cart_Event.create({idEvent: events[i].idEvent, quantity: events[i].quantity, idCart: cart.id})
            }
        }

        cart = await Cart.findByPk(cartId, {
            include: {
                model: Event,
                attributes: ["id", "ticketPrice", "name"],
                through: { attributes: ["quantity"] }
            }
        });

        return res.status(200).json(cart);
    
    } catch (error) {
        
        return res.status(500).json({error: error.message });
    }
};

module.exports = updateCartQuantity;
