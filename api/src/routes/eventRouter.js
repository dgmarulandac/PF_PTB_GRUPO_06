const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler, putEventHandler, getMyEventHandler}  = require ("../handlers/eventHandler")


const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", postCreateEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.put("/updateEvent/:id",putEventHandler);
eventRouter.get("/myEvents/:id", getMyEventHandler)

module.exports = eventRouter;
