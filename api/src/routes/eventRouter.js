const { Router} = require ("express");
const {
    getEventHandler,
    getEventByIdHandler,
    postCreateEventHandler,
    putEventHandler,
    getMyEventHandler,
    getAdminEventsHandler,
    toggleEventHandler
}  = require ("../handlers/eventHandler")

const { verifyToken, isAdmin, isSeller } = require("../middleware/authJwt");
const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", [verifyToken, isSeller], postCreateEventHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.put("/updateEvent/:id", [verifyToken, isSeller], putEventHandler);
eventRouter.get("/myEvents/:id", [verifyToken, isSeller], getMyEventHandler);
eventRouter.get("/admin", [verifyToken, isAdmin], getAdminEventsHandler);
eventRouter.put("/toggleEvent/:id", [verifyToken, isSeller], toggleEventHandler);

module.exports = eventRouter;
