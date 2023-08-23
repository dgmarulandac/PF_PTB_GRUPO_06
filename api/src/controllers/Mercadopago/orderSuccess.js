require('dotenv').config();
var mercadopago = require('mercadopago');
const {Order, Event, Sale} = require ('../../db');
// const emailSuccessPayment = require( '../Email/emailSuccessPayment' );

const orderSuccess = async (req, res) => {

   console.log(req.query);
   const {preference_id, collection_status, status, payment_type } = req.query;

   const isSuccesful = collection_status === status;

   const order = await Order.findOne({
      where: {
         idMercadoPago: preference_id
      }
   });

   

   const event = await Event.findByPk(order.idEvent);

   event.cantTickets = event.cantTickets - order.quantity;
   event.save();

   const sale = await Sale.create( {idOrder: order.id, paymentMethod:payment_type, isSuccesful: isSuccesful } );

   // correo de ceci
   //emailSuccessPayment();
    
   res.status(301).redirect(`https://pf-ptb-grupo-06.vercel.app/sales/${sale.id}`);
}
    

module.exports = orderSuccess;