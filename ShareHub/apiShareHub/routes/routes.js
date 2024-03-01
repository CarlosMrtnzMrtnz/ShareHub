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
router.post('/crear-grupo/:directorio', mdlMulter.array("imgGrupo"),  gruposController.crearGrupo)
router.put('/actualizar-grupo/:grupoId/:directorio',mdlMulter.array("imgGrupo"), gruposController.actualizarGrupo)
router.delete('/eliminar-grupo/:grupoId', gruposController.eliminarGrupo)
router.delete('/eliminar-miembro/:miembroId', gruposController.eliminarMiembroDeGrupo);




// ?Rutas Usuario
router.get('/consultar-usuarios',mdJWT.verificarToken, usuarioController.consultarUsuarios);
router.get('/consultar-usuario/:usuarioId', usuarioController.consultarUnUsuario);
router.post('/crear-usuario', usuarioController.crearUsuario)
router.put('/actualizar-usuario/:usuarioId/:directorio', mdlMulter.array("imguser"), usuarioController.actualizarUsuario)
router.delete('/eliminar-usuario/:usuarioId', usuarioController.eliminarUsuario)
router.get('/token-info', usuarioController.desencriptarToken)



// Rutas publiaciones

router.post('/ingreso', sessionController.generarToken) 
// -----------------------------rutas publicaciones---------------------------------------------------
router.get('/consultar-publicaciones', publicacionController.consultarPublicaciones)
router.get('/consultar-publicacion/:idPublicacion', publicacionController.consultarUnaPublicacion)
router.post('/crear-publicacion/:directorio', mdlMulter.array("imgPublicacion"), publicacionController.crearPulicacion);
router.put('/actualizar-publicacion/:idPublicacion/:directorio', mdlMulter.array("imgPublicacion"), publicacionController.actualizarPublicacion)
router.delete('/eliminar-publicacion/:idPublicacion', publicacionController.eliminarPublicacion)
module.exports = router
