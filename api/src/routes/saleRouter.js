const {Router} = require ("express");
const getSaleByIdHandler = require ("../handlers/saleHandler");

const salesRouter = Router();

salesRouter.get("/:id", getSaleByIdHandler);

module.exports = salesRouter;

