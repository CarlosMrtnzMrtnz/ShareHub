const gruposModel = require('../models/gruposModel')

exports.consultarGrupos = async (req, res) => {
    try {
        let dataGrupos = await gruposModel.find()
        res.json(dataGrupos)
    } catch (error) {
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.crearGrupo = async (req, res) => {
    try {

        const imagenGrupo = req.files

        console.log("******************************************************************");
        console.log(req.body);
        console.log("******************************************************************");
        console.log("******************************************************************");
        console.log(req.files);
        console.log("******************************************************************");
        let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
        req.body.imgGrupo = imagenGrupo.find((archivo) => {
            return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
        })


        req.body.imgGrupo = `http://localhost:4000/assets/grupos/${req.body.imgGrupo.filename}`

        let nuevoGrupo = new gruposModel(req.body)
        await nuevoGrupo.save()
        res.send(nuevoGrupo)
        console.log(nuevoGrupo)

    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.eliminarGrupo = async (req, res) => {
    try {
        let dataGrupos = await gruposModel.findById(req.params.grupoId)
        if (!dataGrupos) {
            res.status(404).send({ error: "No se ha encontrado el grupo" })
            return
        }
        await gruposModel.findOneAndDelete({ _id: req.params.grupoId })
        res.status(200).send({ msg: "Eliminado correctamente" })
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.actualizarGrupo = async (req, res) => {
    try {
        if (req.params.grupoId.length == 24) {
            let dataGrupo = await gruposModel.findById(req.params.grupoId)

            if (!dataGrupo) {
                res.status(404).send({ error: "No se ha encontrado el usuario" })
                return
            }
            const { nombreGrupo, descripcionGrupo, imgGrupo } = req.body

            dataGrupo.nombreGrupo = nombreGrupo
            dataGrupo.descripcionGrupo = descripcionGrupo
            dataGrupo.imgGrupo = imgGrupo

            dataGrupo = await gruposModel.findOneAndUpdate({ _id: req.params.grupoId }, dataGrupo, { new: true })
            res.json(dataGrupo)
        } else {
            res.status(403).send({ error: "El id proporcionado no es valido" })
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}

exports.consultarUnGrupo = async (req, res) => {
    try {
        let dataGrupo = await gruposModel.findById(req.params.grupoId)
        if (!dataGrupo) {
            res.status(404).send({ error: "No se ha encontrado el usuario" })
        } else {
            res.send(dataGrupo)
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}
