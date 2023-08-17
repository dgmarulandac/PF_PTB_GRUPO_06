const {Router} = require("express");
const {getUserHandler, getUserByIdHandler, postUserHandler, getUserCheckHandler, postUserLoginHandler } = require("../handlers/userHandler");

const { verifyToken, isAdmin } = require("../middleware/authJwt");

const userRouter = Router();

userRouter.get("/", [verifyToken, isAdmin ], getUserHandler);

userRouter.get("/id/:id", [verifyToken, isAdmin], getUserByIdHandler);

userRouter.post("/register", postUserHandler);

userRouter.get("/check", getUserCheckHandler);

userRouter.post("/login", postUserLoginHandler);

module.exports = userRouter;