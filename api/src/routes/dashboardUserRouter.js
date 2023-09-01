const {Router} = require ("express");
const {dashboardUserHandler, dashboardPutUserHandler} = require ("../handlers/dashboardUserHandler");
const { verifyToken, isBuyer} = require("../middleware/authJwt");

const dashboardUserRouter = Router();

dashboardUserRouter.get("/", [verifyToken, isBuyer], dashboardUserHandler);
dashboardUserRouter.put("/update", [verifyToken, isBuyer], dashboardPutUserHandler);


module.exports = dashboardUserRouter;
