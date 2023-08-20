const Router = require("express");
const {
	VerifyPostHandler,
} = require("../handlers/VerifyHandler/VerifyPostHandler");

const verifyRouter = Router();

verifyRouter.post("/", VerifyPostHandler);

module.exports = verifyRouter;