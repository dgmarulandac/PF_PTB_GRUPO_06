const { Router } = require('express');
// Importar todos los routers;
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
// const saleRouter = require("./saleRouter");

const router = Router();

router.use("/events", eventRouter);
router.use("/users", userRouter);
// router.use("/sales", saleRouter);


module.exports = router;
