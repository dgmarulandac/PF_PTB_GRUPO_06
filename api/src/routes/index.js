const { Router } = require('express');
// Importar todos los routers;
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
// const saleRouter = require("./saleRouter");
const recoverRouter = require("./recoverRouter");
const verifyRouter = require("./verifyRouter");

const router = Router();

router.use("/events", eventRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/recover", recoverRouter);
router.use("/verify", verifyRouter);
// router.use("/sales", saleRouter);


module.exports = router;
