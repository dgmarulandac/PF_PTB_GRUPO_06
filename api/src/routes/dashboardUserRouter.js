const {Router} = require ("express");
const {dashboardUserHandler} = require ("../handlers/dashboardUserHandler");
const { verifyToken, isBuyer} = require("../middleware/authJwt");

const dashboardUserRouter = Router();

dashboardUserRouter.get("/", [verifyToken, isBuyer], dashboardUserHandler);


module.exports = dashboardUserRouter;
