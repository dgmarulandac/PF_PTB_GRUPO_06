const {Router} = require ("express");
const {getCartsHandler, postCartsHandler, getCartTokenHandler} = require ('../handlers/cartHandler');


const cartsRouter = Router();

cartsRouter.get("/",  getCartsHandler);
cartsRouter.post("/createCart", postCartsHandler);
cartsRouter.get("/:token", getCartTokenHandler)

module.exports = cartsRouter;
