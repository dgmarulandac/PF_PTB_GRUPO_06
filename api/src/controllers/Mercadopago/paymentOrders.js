require('dotenv').config();
var mercadopago = require('mercadopago');

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
    

module.exports = {receiveWebHook}