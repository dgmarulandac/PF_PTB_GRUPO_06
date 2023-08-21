require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');



const orderWebHook = async (req, res) => {

    
   res.send ('WebHook Succes')
}
    

module.exports = orderWebHook ;