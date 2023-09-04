const {Router} = require ("express");
const {dashboardPutUserHandler} = require ("../handlers/dashboardUserHandler");
const { verifyToken, isBuyer} = require("../middleware/authJwt");

const dashboardUserRouter = Router();

dashboardUserRouter.put("/update", [verifyToken, isBuyer], dashboardPutUserHandler);


module.exports = dashboardUserRouter;
