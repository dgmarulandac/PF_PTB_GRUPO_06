require('dotenv').config();
var mercadopago = require('mercadopago');
const {Order, Sale} = require ('../../db');

const orderFailure = async (req, res) => {

   const {preference_id, collection_status, status, payment_type } = req.query;

   const order = await Order.findOne({
      where: {
         idMercadoPago: preference_id
      }
   });

   const sale = await Sale.create( {idOrder: order.id, paymentMethod:payment_type, isSuccesful: false } );

   // correo de ceci
   //emailSuccessPayment();
    
   res.status(301).redirect(`https://pf-ptb-grupo-06.vercel.app/sales/${sale.id}`);
}
    

module.exports = orderFailure;