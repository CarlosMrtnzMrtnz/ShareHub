const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const gruposController = require('../controllers/gruposController')
const usuarioController =require('../controllers/usuarios.Controller')
const mdJWT = require('../middleware/jwt')

// endpoints Grupos

router.get('/consultar-grupos', gruposController.consultarGrupos);
router.get('/consultar-grupo/:grupoId', gruposController.consultarUnGrupo);
router.post('/crear-grupo',upload.single('fotoGrupo'), gruposController.crearGrupo, function (req, res){
    console.log(req.file, req.body)
})
router.put('/actualizar-grupo/:grupoId', gruposController.actualizarGrupo)
router.delete('/eliminar-grupo/:grupoId', gruposController.eliminarGrupo)



// ?Rutas Uauario
router.get('/consultar-usuario', usuarioController.consultarUsuarios);
router.get('/consultar-usuario/:usuarioId', usuarioController.consultarUnUsuario);
router.post('/crear-usuario', usuarioController.crearUsuario)
router.put('/actualizar-usuario/:usuarioId', usuarioController.actualizarUsuario)
router.delete('/eliminar-usuario/:usuarioId', usuarioController.eliminarUsuario)

module.exports = router

