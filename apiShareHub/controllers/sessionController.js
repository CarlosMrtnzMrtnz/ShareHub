require('dotenv').config({ path: 'config.env'})
const jwt = require('jsonwebtoken')
const UsuariosModel = require('../models/usuariosModel')

exports.generarToken = async (req, res) => {
    const {nombre, clave} = req.body
    const usuario = await UsuariosModel.findOne({ nombre })
    if(!usuario){
        return res.status(401).json({error: "Credenciales invalidas"})
    } 
    if (usuario.clave !== clave) {
        return res.status(401).json({error: "Credenciales invalidas"})
    }

    const payload = {
        id: usuario._id,
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '1h'})
    return res.status(202).json({ token })
}
