const { Router} = require ("express");
const {postCreateOrdertHandler, getOrderByIdHandler, putOrderHandler}  = require ("../handlers/orderHandler")

const { verifyToken } = require("../middleware/authJwt");
const orderRouter = Router();


orderRouter.post("/createOrder", [verifyToken], postCreateOrdertHandler);
orderRouter.get("/:id", getOrderByIdHandler);



module.exports = orderRouter;