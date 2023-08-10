const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler}  = require ("../handlers/eventHandler")

const eventRouter = Router ();

eventRouter.get("/", getEventHandler);
eventRouter.get("/:id",getEventByIdHandler);



module.exports = eventRouter;