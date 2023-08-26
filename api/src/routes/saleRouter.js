const {Router} = require ("express");
const {getSaleByIdHandler, getMySalesHandler} = require ("../handlers/saleHandler");

const { verifyToken, isAdmin, isSeller } = require("../middleware/authJwt");
const salesRouter = Router();

salesRouter.get("/mySales", [verifyToken, isSeller], getMySalesHandler);
salesRouter.get("/:id", getSaleByIdHandler);

module.exports = salesRouter;

