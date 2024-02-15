const express = require('express');
const router = express.Router();
const publicacionController = require ('../controllers/publicacionesController')
const sessionController = require ('../controllers/sessionController')


















router.post('/ingreso', sessionController.generarToken)
// -----------------------------rutas publicaciones---------------------------------------------------
router.post('/publicacion', publicacionController.crearPulicacion);
router.delete('/eliminar-publicacion/:idProducto', publicacionController.eliminarPublicacion)

module.exports = router
