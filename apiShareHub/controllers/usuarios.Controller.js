const UsuariosModel = require('../models/usuariosModel')
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

        let correoNuevo = req.body.CorreoUser
        let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (regexCorreo.test(correoNuevo)) {
            let nuevoUsuario = new UsuariosModel(req.body)
            await nuevoUsuario.save()
            res.send(nuevoUsuario)
            console.log(nuevoUsuario)
        } else {
            Swal.fire({
                title: "ese correo invalido! 😁",
            });
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
        await UsuariosModel.findOneAndDelete({ _id: req.params.usuarioId })
        res.status(200).send({ msg: "Eliminado correctamente" })
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {

        if (req.params.usuarioId.length == 24) {
            let dataUsuario = await UsuarioModel.findById(req.params.usuarioId)

            if (!dataUsuario) {
                res.status(404).send({ error: "No se ha encontrado el usuario" })
                return
            }
            const { nombre, correo, clave } = req.body

            dataUsuario.nombre = nombre
            dataUsuario.correo = correo
            dataUsuario.clave = clave

            dataUsuario = await UsuariosModel.findOneAndUpdate({ _id: req.params.usuarioId }, dataUsuario, { new: true })
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
