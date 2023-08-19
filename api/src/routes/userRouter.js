const {Router} = require("express");
const {getUserHandler, getUserByIdHandler, postUserHandler, getUserCheckHandler, postUserLoginHandler, postAuthHandler } = require("../handlers/userHandler");

const { verifyToken, isAdmin } = require("../middleware/authJwt");
const { verifyGoogle } = require("../middleware/googleUser");

const userRouter = Router();

userRouter.get("/", [verifyToken, isAdmin ], getUserHandler);

userRouter.get("/id/:id", [verifyToken, isAdmin], getUserByIdHandler);

userRouter.post("/register", postUserHandler);

userRouter.get("/check", getUserCheckHandler);

userRouter.post("/login", [verifyGoogle], postUserLoginHandler);

userRouter.post("/auth", postAuthHandler);

module.exports = userRouter;