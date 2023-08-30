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

const { verifyToken, isAdmin, isSeller, isSellerOrAdmin } = require("../middleware/authJwt");
const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/createEvent", [verifyToken, isSeller], postCreateEventHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.put("/updateEvent/:id", [verifyToken, isSellerOrAdmin], putEventHandler);
eventRouter.get("/myEvents/:id", [verifyToken, isSeller], getMyEventHandler);
eventRouter.get("/admin", [verifyToken, isAdmin], getAdminEventsHandler);
eventRouter.put("/toggleEvent/:id", [verifyToken, isSellerOrAdmin], toggleEventHandler);

module.exports = eventRouter;
