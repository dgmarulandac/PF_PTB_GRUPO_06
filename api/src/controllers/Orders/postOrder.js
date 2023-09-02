require('dotenv').config();
const {Order, Event} = require('../../db.js');
const getCartToken = require('../Carts/getCartToken.js');
var mercadopago = require('mercadopago');
const {MERCADOPAGO_TOKEN} = process.env;

const postCreateOrder = async (idBuyer, token) => {

    if (!idBuyer || !token) {
        throw new Error("Faltan campos obligatorios");
    }

    //Obtener el carrito del token
    cart = getCartToken(token);
    console.log(cart);

    mercadopago.configure({
        access_token: `${MERCADOPAGO_TOKEN}`,
    });

    const result = await mercadopago.preferences.create({
        items:[
            {
                title: Event.findByPk(idEvent).name,
                unit_price: price,
                currency_id: Event.findByPk(idEvent).currency,
                quantity: quantity,
            }
        ],
        back_urls: {
            success: "https://pf-grupo06-back.onrender.com/orderMercadoPago/success",
            failure: "https://pf-grupo06-back.onrender.com/orderMercadoPago/failure",
            pending: "https://pf-grupo06-back.onrender.com/orderMercadoPago/pending"
        },
        notification_url: "https://6172-186-113-173-20.ngrok.io/webHook"

    });

    const createOrder = await Order.create({
        idBuyer,
        idMercadoPago: result.body.id
    });

    //Agrega a Order_Event con ese createOrder id

    console.log(result)
        
    return {response: result.response, preferenceId: result.preferenceId}
};

module.exports = postCreateOrder;