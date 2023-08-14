const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler}  = require ("../handlers/eventHandler")

const { verifyToken, isAdmin, isSeller } = require("../middleware/authJwt");

const eventRouter = Router ();

eventRouter.get("/", getEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.post("/createEvent", [verifyToken, isAdmin, isSeller], postCreateEventHandler);

module.exports = eventRouter;
