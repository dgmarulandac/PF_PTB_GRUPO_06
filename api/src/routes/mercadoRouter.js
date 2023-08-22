const { Router} = require ("express");
const {receiveWebHook}= require ('../controllers/Mercadopago/paymentOrders');
const orderSuccess = require ('../controllers/Mercadopago/orderSuccess');
//const orderWebHook = require ('../controllers/Mercadopago/orderWebHook');
const orderFailure = require ('../controllers/Mercadopago/orderFailure');
const orderPending = require ('../controllers/Mercadopago/orderPending');

const mercadoRouter = Router();


mercadoRouter.get("/success", orderSuccess);
mercadoRouter.get("/failure", orderFailure);
mercadoRouter.get("/pending", orderPending);
mercadoRouter.post("/webHook", receiveWebHook);



// eventRouter.post("/createEvent", postCreateEventHandler);
// eventRouter.get("/:id",getEventByIdHandler);

module.exports = mercadoRouter;
