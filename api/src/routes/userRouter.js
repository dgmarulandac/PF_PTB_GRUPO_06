const {Router} = require("express");
const {getUserHandler, getUserByIdHandler, postUser, getUserCheck, postUserLogin } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.get("/", getUserHandler);

userRouter.get("/id/:id", getUserByIdHandler);

userRouter.post("/register", postUser);

userRouter.get("/check", getUserCheck);

userRouter.post("/login", postUserLogin);

module.exports = userRouter;