const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/gruposController')
const usuarioController =require('../controllers/usuarios.Controller')
const publicacionController = require ('../controllers/publicacionesController')
const mdJWT = require('../middleware/jwt')
const sessionController = require ('../controllers/sessionController')
const mdlMulter = require("../middleware/multer")

// endpoints Grupos

router.get('/consultar-grupos', gruposController.consultarGrupos);
router.get('/consultar-grupo/:grupoId', gruposController.consultarUnGrupo);
router.post('/crear-grupo', mdlMulter.array("pepe"),  gruposController.crearGrupo)
router.put('/actualizar-grupo/:grupoId', gruposController.actualizarGrupo)
router.delete('/eliminar-grupo/:grupoId', gruposController.eliminarGrupo)



// ?Rutas Uauario
router.get('/consultar-usuario', usuarioController.consultarUsuarios);
router.get('/consultar-usuario/:usuarioId', usuarioController.consultarUnUsuario);
router.post('/crear-usuario', usuarioController.crearUsuario)
router.put('/actualizar-usuario/:usuarioId', usuarioController.actualizarUsuario)
router.delete('/eliminar-usuario/:usuarioId', usuarioController.eliminarUsuario)


// Rutas publiaciones

router.post('/ingreso', sessionController.generarToken)
// -----------------------------rutas publicaciones---------------------------------------------------
router.post('/publicacion', publicacionController.crearPulicacion);
router.delete('/eliminar-publicacion/:idProducto', publicacionController.eliminarPublicacion)

module.exports = router
