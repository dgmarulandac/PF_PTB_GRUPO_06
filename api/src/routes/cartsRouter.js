const {Router} = require ("express");
const {getCartsHandler} = require ('../handlers/cartHandler');


const cartsRouter = Router();

cartsRouter.get("/",  getCartsHandler);

module.exports = cartsRouter;
