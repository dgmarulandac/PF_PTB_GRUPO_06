const {Router} = require("express");
const {getUserHandler, getUserByIdHandler, postUserHandler, getUserCheckHandler, postUserLoginHandler } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);

userRouter.get("/id/:id", getUserByIdHandler);

userRouter.post("/register", postUserHandler);

userRouter.get("/check", getUserCheckHandler);

userRouter.post("/login", postUserLoginHandler);

module.exports = userRouter;