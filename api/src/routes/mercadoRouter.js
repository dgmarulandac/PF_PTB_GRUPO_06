const { Router} = require ("express");
const createOrder = require ('../controllers/Orders/paymentOrders');


const mercadoRouter = Router();

mercadoRouter.get("/create_Order", createOrder);
// eventRouter.post("/createEvent", postCreateEventHandler);
// eventRouter.get("/:id",getEventByIdHandler);

module.exports = mercadoRouter;
