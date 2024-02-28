const usuariosModel = require('../models/usuariosModel');
const UsuariosModel = require('../models/usuariosModel')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config.env' })



exports.crearUsuario = async (req, res) => {
    try {
        console.log(req.body);
        let nuevoUsuario = new UsuariosModel(req.body)
        await nuevoUsuario.save()
        res.send(nuevoUsuario)
        console.log(nuevoUsuario)
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

// exports.consultarUnUsuario = async (req, res) => {
//     try {

//         verificarUsuario()
//     } catch (error) {
//         console.log('error:', error)
//         res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
//     }
// }

exports.consultarUsuarios = async (req, res) => {
    try {
        let dataUsuarios = await UsuariosModel.find()
        res.json(dataUsuarios)
    } catch (error) {
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.crearUsuario = async (req, res) => {
    let verificarCorreo = await UsuariosModel.find({ CorreoUser: req.body.CorreoUser })
    try {
        console.log(verificarCorreo);

        if (verificarCorreo.length == 0) {
            let correoNuevo = req.body.CorreoUser
            let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (regexCorreo.test(correoNuevo)) {
                let nuevoUsuario = new UsuariosModel(req.body)
                await nuevoUsuario.save()
                res.send(nuevoUsuario)
            }
        } else {
            res.status(403).json({ msg: "El correo ya existe" })
        }


    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}


exports.eliminarUsuario = async (req, res) => {
    try {
        let dataUsuario = await UsuariosModel.findById(req.params.usuarioId)
        if (!dataUsuario) {
            res.status(404).send({ error: "No se ha encontrado el usuario" })
            return
        }
        await UsuariosModel.findOneAndDelete({ CorreoUser: req.params.usuarioId })
        res.status(200).send({ msg: "Eliminado correctamente" })
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        if (req.params.usuarioId.length == 24) {
            let dataUsuario = await usuariosModel.findById(req.params.usuarioId)
            if (!dataUsuario) {
                res.status(404).send({ error: "No se ha encontrado el usuario" })
                return
            }
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log(req.body);
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            console.log("---------------------------------------------------------------------------");
            const { nombre, descripcionuser } = req.body
            dataUsuario.nombre = nombre
            dataUsuario.descripcionuser = descripcionuser
            dataUsuario.CorreoUser = dataUsuario.CorreoUser
            dataUsuario.clave = dataUsuario.clave
            if (req.files.length != 0) {
                const imagenUser = req.files
                console.log(req.files);
                let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
                req.body.imguser = imagenUser.find((archivo) => {
                    return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
                })
                dataUsuario.imguser = `http://localhost:4000/assets/perfil/${req.body.imguser.filename}`

                console.log("******************************************************************");
                console.log("******************************************************************");
                console.log("******************************************************************");

                console.log(dataUsuario);

                console.log("******************************************************************");

            } else {
                dataUsuario.imguser = dataUsuario.imguser
            }

            // -----------------------------------------

            console.log("🚀 ~ exports.actualizarUsuario= ~ req.params.usuarioId:", req.params.usuarioId)

            dataUsuario = await usuariosModel.findOneAndUpdate({ _id: req.params.usuarioId }, dataUsuario, { new: true })
            res.json(dataUsuario)
        } else {
            res.status(403).send({ error: "El id proporcionado no es valido" })
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.consultarUnUsuario = async (req, res) => {
    try {
        let dataUsuario = await UsuariosModel.findById(req.params.usuarioId)
        if (!dataUsuario) {
            res.status(404).send({ error: "No se ha encontrado el usuario" })
        } else {
            res.send(dataUsuario)
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}


exports.desencriptarToken = (req, res) => {
    try {
        let token = req.headers.authorization
        token = token.split(' ')
        token = token[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        return res.json(decoded);

    } catch (error) {
        // Si hay algún error en la verificación o decodificación, manejamos el error
        console.error('Error al desencriptar el token:', error.message);
        return null;
    }
}
