const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler}  = require ("../handlers/eventHandler")

const eventRouter = Router ();

eventRouter.get("/", getEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.post("/createEvent", postCreateEventHandler);

module.exports = eventRouter;
