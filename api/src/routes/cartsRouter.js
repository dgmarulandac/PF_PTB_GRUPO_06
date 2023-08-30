const {Router} = require ("express");
const {getCartsHandler, postCartsHandler, getCartTokenHandler, putCartTokenHandler} = require ('../handlers/cartHandler');


const cartsRouter = Router();

cartsRouter.get("/",  getCartsHandler);
cartsRouter.post("/createCart", postCartsHandler);
cartsRouter.get("/:token", getCartTokenHandler)
cartsRouter.put("/updateCart", putCartTokenHandler)

module.exports = cartsRouter;
