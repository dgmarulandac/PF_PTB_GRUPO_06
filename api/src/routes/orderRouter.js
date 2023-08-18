const { Router} = require ("express");
const {postCreateOrdertHandler}  = require ("../handlers/orderHandler")


const orderRouter = Router();


orderRouter.post("/createOrder", postCreateOrdertHandler);


module.exports = orderRouter;