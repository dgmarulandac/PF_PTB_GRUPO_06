require('dotenv').config();
var mercadopago = require('mercadopago');

const {MERCADOPAGO_TOKEN} = process.env;

const createOrder = async (req, res) => {

    mercadopago.configure({
        access_token: `${MERCADOPAGO_TOKEN}`,
        
    });

    const result = await mercadopago.preferences.create({
        items:[
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                currency_id: req.body.currency,
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            success: "http://localhost:3001/success",
            failure: "http://localhost:3001/failure",
            pending: "http://localhost:3001/pending"
        },
        notification_url: "https://6172-186-113-173-20.ngrok.io/webHook"

    });

    console.log(result)

    res.send (result.body)
};

const receiveWebHook = async (req, res) => {
       const payment = req.query;

      try{

        if(payment.type == "payment"){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
           }

           res.sendStatus(204)

      }catch(error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
      }

        
        

}
    

module.exports = {createOrder, receiveWebHook}