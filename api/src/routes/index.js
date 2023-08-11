const { Router } = require('express');
//TODO: Agregar la logica de rutas.
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");
const saleRouter = require("./saleRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', eventRouter);


module.exports = router;
