require('dotenv').config();
var mercadopago = require('mercadopago');
const Orders = require ('../../db');

const {MERCADOPAGO_TOKEN} = process.env;

const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: "TEST-5383245289318437-081821-1597b58a298575b02b26356402cff10b-1455385992",
        
    });

    const result = await mercadopago.preferences.create({
        items:[
            {
                title: "laptop lenovo",
                unit_price: 500,
                currency_id: "COP",
                quantity: 1,
            }
        ]

    })

    console.log(result)

    res.send ('creating order')
}
    

module.exports = createOrder;