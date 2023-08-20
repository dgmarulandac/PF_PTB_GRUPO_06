const Router = require("express");
const {
	RecoverConfirmHandler,
} = require("../handlers/RecoverHandler/RecoverConfirmHandler");
const { RecoverPostPassHandler } = require("../handlers/RecoverHandler/RecoverPostPassHandler");

const recoverRouter = Router();

recoverRouter.post("/", RecoverPostPassHandler);

recoverRouter.post("/:token", RecoverConfirmHandler);

module.exports = recoverRouter;