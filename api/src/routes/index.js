const { Router } = require('express');
// Importar todos los routers;
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const mercadoRouter = require("./mercadoRouter");
// const saleRouter = require("./saleRouter");

const router = Router();

router.use("/events", eventRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/orderMercadoPago", mercadoRouter);
// router.use("/sales", saleRouter);


module.exports = router;
