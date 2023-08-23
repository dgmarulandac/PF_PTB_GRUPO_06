require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');



const orderPending = async (req, res) => {

    
   res.send ('Operation Pending')
}
    

module.exports = orderPending;