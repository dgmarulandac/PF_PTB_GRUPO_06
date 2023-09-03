const { Cart_Event } = require("../../db");

const deleteEventFromCart = async (req, res) => {
  try {
    const { eventId, token } = req.body;
    const userId = req.id;

    let cartId = "";
        
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            throw Error ("Carrito no existe");
        }
        cartId= decoded.id;
    });

   
    const cartEvent = await Cart_Event.findOne({
      where: {
        idEvent: eventId,
        idCart: userId, 
      },
    });

    if (!cartEvent) {
      return res.status(404).json({ message: "Evento no encontrado en el carrito" });
    }


    await cartEvent.destroy();

    return res.status(200).json({ message: "Evento eliminado del carrito exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteEventFromCart;
