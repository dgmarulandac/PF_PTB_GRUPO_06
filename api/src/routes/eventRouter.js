const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler, putEventHandler}  = require ("../handlers/eventHandler")


const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", postCreateEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.put("/updateEvent/:id",putEventHandler);

module.exports = eventRouter;
