const getSaleById = require("../controllers/Sale/getSales");
const {Order, Event, Sale, User} = require ('../db')


const getSaleByIdHandler = async (req, res) => {
    const { id } = req.params;  

    
    try {
        const saleById = await getSaleById(id);
        if(!saleById){
            throw Error("No se encuentra venta")
        }else{
            const order = await Order.findByPk(saleById.idOrder)
            const user = await User.findByPk(order.idBuyer);
            const event = await Event.findByPk(order.idEvent);

            res.status(200).json( {
                name: user.name,
                email: user.email,
                eventName: event.name,
                eventImage: event.image,
                price: order.price,
                quantity: order.quantity,
                currency: event.currency,
                date: event.date,
                hour: event.hour,
                address: event.address,
                country: event.country,
                ...saleById
             });
        
        }
         
   } catch (error) {
        res.status(404).send(error.message)
    }
};

module.exports = getSaleByIdHandler;