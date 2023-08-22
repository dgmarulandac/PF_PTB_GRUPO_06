require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');



const orderSuccess = async (req, res) => {

    
   res.send ('Operation Succes')
}
    

module.exports = orderSuccess;