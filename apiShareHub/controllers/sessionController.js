require('dotenv').config({ path: 'config.env'})
const jwt = require('jsonwebtoken')
const UsuariosModel = require('../models/usuariosModel')

exports.generarToken = async (req, res) => {
    const {CorreoUser, clave} = req.body
    const usuario = await UsuariosModel.findOne({ CorreoUser })
    if(!usuario){
        return res.status(401).json({error: "Credenciales invalidas (correo)"})
    } 
    if (usuario.clave !== clave) {
        return res.status(401).json({error: "Credenciales invalidas (clave)"})
    }

    const payload = {
        id: usuario._id,
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '100h'})
    return res.status(202).json({ token })
}
