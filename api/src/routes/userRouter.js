const {Router} = require("express");
const {getUserHandler, getUserByIdHandler} = require("../handlers/userHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);

userRouter.get("/:id", getUserByIdHandler);

module.exports = userRouter;