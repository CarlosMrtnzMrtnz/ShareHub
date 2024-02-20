const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const gruposController = require('../controllers/gruposController')
const usuarioController =require('../controllers/usuarios.Controller')
const publicacionController = require ('../controllers/publicacionesController')
const mdJWT = require('../middleware/jwt')
const sessionController = require ('../controllers/sessionController');
const { validationResult  } = require('express-validator');
const { validateUsuario } = require('../validators/user');
const UsuariosModel = require('../models/usuariosModel');






// endpoints Grupos

router.get('/consultar-grupos', gruposController.consultarGrupos);
router.get('/consultar-grupo/:grupoId', gruposController.consultarUnGrupo);
router.post('/crear-grupo',upload.single('fotoGrupo'), gruposController.crearGrupo, function (req, res){
    console.log(req.file, req.body)
})
router.put('/actualizar-grupo/:grupoId', gruposController.actualizarGrupo)
router.delete('/eliminar-grupo/:grupoId', gruposController.eliminarGrupo)



// ?Rutas Usuario
router.get('/consultar-usuario', usuarioController.consultarUsuarios);
router.get('/consultar-usuario/:usuarioId', usuarioController.consultarUnUsuario);
router.post('/crear-usuario',validateUsuario, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let nuevoUsuario = new UsuariosModel(req.body);
        await nuevoUsuario.save();
        
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Ha ocurrido algo, comuníquese con el administrador" });
        
    }
}); 
router.put('/actualizar-usuario/:usuarioId', usuarioController.actualizarUsuario)
router.delete('/eliminar-usuario/:usuarioId', usuarioController.eliminarUsuario)


// Rutas publiaciones

router.post('/ingreso', sessionController.generarToken)
// -----------------------------rutas publicaciones---------------------------------------------------
router.post('/publicacion', publicacionController.crearPulicacion);
router.delete('/eliminar-publicacion/:idProducto', publicacionController.eliminarPublicacion)

module.exports = router
