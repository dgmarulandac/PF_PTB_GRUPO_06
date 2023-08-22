require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');



const orderFailure = async (req, res) => {

    
   res.send ('Operation Failure')
}
    

module.exports = orderFailure;