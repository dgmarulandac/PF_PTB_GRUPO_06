require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');



const orderSuccess = async (req, res) => {

    
   res.send (req.body)
}
    

module.exports = orderSuccess;