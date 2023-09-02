require('dotenv').config();
const {Order, Event, Order_Event} = require('../../db.js');
const getCartToken = require('../Carts/getCartToken.js');
var mercadopago = require('mercadopago');
const {MERCADOPAGO_TOKEN} = process.env;

const postCreateOrder = async (idBuyer, token) => {

    if (!idBuyer || !token) {
        throw new Error("Faltan campos obligatorios");
    }

    //Obtener el carrito del token
    cart = await getCartToken(token);

    if( cart.dataValues.idUser !== idBuyer ) {
        throw new Error("Este carro no le pertenece al usuario.")
    }

    let items = [];

    for( let i = 0; i < cart.dataValues.Events.length; i++) {
        const event = cart.dataValues.Events[i];
        const item = {
            title: event.dataValues.name,
            unit_price: event.dataValues.ticketPrice,
            currency_id: await Event.findByPk(event.dataValues.id).currency,
            quantity: event.dataValues.Cart_Event.dataValues.quantity
        };
        items.push(item);
    }

    mercadopago.configure({
        access_token: `${MERCADOPAGO_TOKEN}`,
    });

    const result = await mercadopago.preferences.create({
        items,
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
    for( let i = 0; i < cart.dataValues.Events.length; i++) {
        const event = cart.dataValues.Events[i];
        await Order_Event.create({
            idEvent: event.dataValues.id,
            idOrder: createOrder.id,
            quantity: event.dataValues.Cart_Event.dataValues.quantity,
            price: event.dataValues.ticketPrice
        });
    }
    
    cart.active = false;
    cart.save();
        
    return {response: result.response, preferenceId: result.preferenceId}
};

module.exports = postCreateOrder;