const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const gruposController = require('../controllers/gruposController')

// endpoints Grupos

router.get('/consultar-grupos', gruposController.consultarGrupos);
router.get('/consultar-grupo/:grupoId', gruposController.consultarUnGrupo);
router.post('/crear-grupo',upload.single('fotoGrupo'), gruposController.crearGrupo, function (req, res){
    console.log(req.file, req.body)
})
router.put('/actualizar-grupo/:grupoId', gruposController.actualizarGrupo)
router.delete('/eliminar-grupo/:grupoId', gruposController.eliminarGrupo)


module.exports = router;
