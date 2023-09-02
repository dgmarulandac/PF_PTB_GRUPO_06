require('dotenv').config();
const {Order, Event} = require('../../db.js');
var mercadopago = require('mercadopago');
const {MERCADOPAGO_TOKEN} = process.env;

const postCreateOrder = async (req, res) => {
    try {
        const { 
            idBuyer, 
            quantity, 
            price, 
            idEvent, 
            
        } = req.body;

        
        if (!idBuyer || !quantity || !price || !idEvent) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

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
            quantity, 
            price, 
            idEvent,
            idMercadoPago: result.body.id
        });
    
        console.log(result)
           
        return {response: result.response,
                preferenceId: result.preferenceId}
        
    } catch (error) {
        
        res.status(500).json({ error: "Hubo un error al crear la orden: " + error.message });
    }
};

module.exports = postCreateOrder;