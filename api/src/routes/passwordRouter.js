const {Router} = require ("express");
const {postVerifyHandler, postRecoverHandler}  = require ("../handlers/passwordHandler")

const passwordRouter = Router();

passwordRouter.post("/verify", postVerifyHandler);
passwordRouter.post("/recover", postRecoverHandler);

module.exports = passwordRouter;