const {Router} = require ("express");
const {getSaleByIdHandler, getMySalesHandler, getMyPurchasesHandler} = require ("../handlers/saleHandler");

const { verifyToken, isSeller, isBuyer } = require("../middleware/authJwt");
const salesRouter = Router();

salesRouter.get("/mySales", [verifyToken, isSeller], getMySalesHandler);
salesRouter.get("/myPurchases", [verifyToken, isBuyer], getMyPurchasesHandler);
salesRouter.get("/:id", getSaleByIdHandler);

module.exports = salesRouter;

