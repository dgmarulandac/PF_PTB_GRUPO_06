const {Order, Event, Sale, User, Order_Event} = require ('../../db');
const emailSuccessfulPayment = require( '../Email/emailSuccessfulPayment' );

const orderSuccess = async (req, res) => {

   const {preference_id, collection_status, status, payment_type } = req.query;

   const isSuccesful = collection_status === status;

   const order = await Order.findOne({
      where: {
         idMercadoPago: preference_id
      }
   });

   const user = await User.findByPk(order.idBuyer);
   
   const events = await Order_Event.findAll({
      where: {
         idOrder: order.id
      }
   });

   for( let i = 0; i < events.legth; i++ ) {
      const event = await Event.findByPk(events[i].idEvent);
      event.cantTickets = event.cantTickets - events[i].quantity;
      event.save();
      const emailData = {
         name: user.name,
         email: user.email,
         eventName: event.name,
         eventImage: event.image,
         price: events[i].price,
         quantity: events[i].quantity,
         currency: event.currency,
         date: event.date,
         hour: event.hour,
         address: event.address,
         country: event.country
      };
      await emailSuccessfulPayment(emailData);
   }

   const sale = await Sale.create( {idOrder: order.id, paymentMethod:payment_type, isSuccesful: isSuccesful } );

    
   res.status(301).redirect(`https://pf-ptb-grupo-06.vercel.app/sales/${sale.id}`);
}
    

module.exports = orderSuccess;