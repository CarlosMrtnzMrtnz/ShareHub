const express = require('express');
const router = express.Router();
const usuarioController =require('../controllers/usuarios.Controller')

const mdJWT = require('../middleware/jwt')

// ?Rutas Uauario
router.get('/consultar-usuario', usuarioController.consultarUsuarios);
router.get('/consultar-usuario/:usuarioId', usuarioController.consultarUnUsuario);
router.post('/crear-usuario', usuarioController.crearUsuario)
router.put('/actualizar-usuario/:usuarioId', usuarioController.actualizarUsuario)
router.delete('/eliminar-usuario/:usuarioId', usuarioController.eliminarUsuario)

module.exports = router

