const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler, postCreateEventHandler, putEventHandler, getMyEventHandler}  = require ("../handlers/eventHandler")

const { verifyToken, isAdmin, isSeller } = require("../middleware/authJwt");
const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", [verifyToken, isSeller], postCreateEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.put("/updateEvent/:id", [verifyToken, isSeller], putEventHandler);
eventRouter.get("/myEvents/:id", [verifyToken, isSeller], getMyEventHandler)

module.exports = eventRouter;
