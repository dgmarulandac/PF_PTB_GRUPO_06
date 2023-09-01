const { Router} = require ("express");
const {postCreateOrdertHandler, getOrderByIdHandler, putOrderHandler}  = require ("../handlers/orderHandler")


const orderRouter = Router();


orderRouter.post("/createOrder", postCreateOrdertHandler);
orderRouter.get("/:id", getOrderByIdHandler);



module.exports = orderRouter;