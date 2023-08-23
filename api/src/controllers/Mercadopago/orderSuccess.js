require('dotenv').config();
var mercadopago = require('mercadopago');
const {Order, Event, Sale, User} = require ('../../db');
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
   const event = await Event.findByPk(order.idEvent);

   event.cantTickets = event.cantTickets - order.quantity;
   event.save();

   const sale = await Sale.create( {idOrder: order.id, paymentMethod:payment_type, isSuccesful: isSuccesful } );

   const emailData = {
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
      country: event.country
   }
   await emailSuccessfulPayment(emailData);
    
   res.status(301).redirect(`https://pf-ptb-grupo-06.vercel.app/sales/${sale.id}`);
}
    

module.exports = orderSuccess;