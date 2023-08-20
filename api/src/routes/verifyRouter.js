const Router = require("express");
const {
	VerifyPostHandler,
} = require("../handler/VerifyHandler/VerifyPostHandler");

const verifyRouter = Router();

verifyRouter.post("/", VerifyPostHandler);

module.exports = verifyRouter;