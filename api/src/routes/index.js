const { Router } = require('express');
// Importar todos los routers;
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const mercadoRouter = require("./mercadoRouter");
const passwordRouter = require("./passwordRouter");
const saleRouter = require('./saleRouter');
const reviewsRouter = require('./reviewsRouter')
const router = Router();

router.use("/events", eventRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/orderMercadoPago", mercadoRouter);
router.use("/password", passwordRouter);
router.use("/sales", saleRouter);
router.use("/reviews", reviewsRouter);




module.exports = router;
