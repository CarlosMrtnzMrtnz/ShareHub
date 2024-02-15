const express = require('express');
const router = express.Router();
const publicacionController = require ('../controllers/publicacionesController')


router.post('/publicacion', publicacionController.crearPulicacion);
router.delete('/eliminar-publicacion/:idProducto', publicacionController.eliminarPublicacion)

module.exports = router
