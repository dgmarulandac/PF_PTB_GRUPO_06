const {Router} = require ("express");
const {postVerifyHandler, postRecoverHandler}  = require ("../handlers/passwordHandler")

const passwordRouter = Router();

orderRouter.post("/verify", postVerifyHandler);
orderRouter.post("/recover", postRecoverHandler);

module.exports = passwordRouter;