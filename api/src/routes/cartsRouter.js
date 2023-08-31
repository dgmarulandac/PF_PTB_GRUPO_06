const {Router} = require ("express");
const {getCartsHandler, postCartsHandler, getCartTokenHandler, putCartTokenHandler} = require ('../handlers/cartHandler');

const { verifyTokenOptional, verifyToken, isAdmin } = require("../middleware/authJwt");
const cartsRouter = Router();

cartsRouter.get("/", [verifyToken, isAdmin], getCartsHandler);
cartsRouter.post("/createCart", [verifyTokenOptional], postCartsHandler);
cartsRouter.get("/:token", [verifyTokenOptional], getCartTokenHandler)
cartsRouter.put("/updateCart", [verifyTokenOptional], putCartTokenHandler)

module.exports = cartsRouter;
