require('dotenv').config();
const {Orders} = require('../db.js');
const getOrdertById = require('../controllers/Orders/getOrderById.js');
const {Event} = require  ('../db.js')
var mercadopago = require('mercadopago');
const {MERCADOPAGO_TOKEN} = process.env;

const postCreateOrdertHandler = async (req, res) => {
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
                success: "http://localhost:3001/success",
                failure: "http://localhost:3001/failure",
                pending: "http://localhost:3001/pending"
            },
            notification_url: "https://6172-186-113-173-20.ngrok.io/webHook"
    
        });

        const createOrder = await Orders.create({
            idBuyer, 
            quantity, 
            price, 
            idEvent,
            idMercadoPago: result.body.id
        });
    
        console.log(result)
           
        res.status(200).json(result.body.init_point);
    } catch (error) {
        
        res.status(500).json({ error: "Hubo un error al crear la orden: " + error.message });
    }
};

const getOrderByIdHandler = async (req, res) => {
    const { id } = req.params;  
    
    try {
        const ordertById = await getOrdertById(id);
        res.status(200).json(ordertById);

    } catch (error) {
        res.status(404).send(error.message)
    }
};

const putOrderHandler = async (req, res, next) => {
try{
    let order = await Orders.findByPk(req.params.id);

    if(!order){
        return res.json({
            success:false,
            message: "Order ID doesn't exist"
        });
    }else{
        let orders = await Orders.findByPk(req.params.id);
        console.log(orders);
        let updateOrder = await orders.update({
            quantity: req.body.quantity
        });

        res.json({
            success: false,
            message:" order update successfully",
            order: updateOrder

        });
    }

}catch (error){
    next(error)

}
    
}

module.exports = { postCreateOrdertHandler, getOrderByIdHandler, putOrderHandler}; 
