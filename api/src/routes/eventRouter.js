const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler}  = require ("../handlers/eventHandler")

const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", postCreateEventHandler);
eventRouter.get("/:id",getEventByIdHandler);

module.exports = eventRouter;
