const publicacionesModel = require('../models/publicacionesModel')

exports.consultarPublicaciones = async (req, res) => {
    try {
        let dataPublicacion = await publicacionesModel.find({tipoPublicacion : true})
        const { tipoPublicacion } = req.body
        dataPublicacion.tipoPublicacion = tipoPublicacion
            res.json(dataPublicacion)
            console.log(dataPublicacion)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador' })
    }
}
exports.consultarPublicacionesGrupos = async (req, res) => {
    try {
        let dataPublicacion = await publicacionesModel.find({tipoPublicacion : false})
        const { tipoPublicacion } = req.body
        dataPublicacion.tipoPublicacion = tipoPublicacion
        // if (req.body.tipoPublicacion === true) {
            res.json(dataPublicacion)
            console.log(dataPublicacion)
        // }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador' })
    }
}

exports.crearPulicacion = async (req, res) => {

    try {
        const imagenPublicacion = req.files

        if (imagenPublicacion.length > 0 && imagenPublicacion != "") {
            let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
            req.body.imgPublicacion = imagenPublicacion.find((archivo) => {
                return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
            })

            req.body.imagenPublicacion = `http://localhost:4000/assets/publicacion/${req.body.imgPublicacion.filename}`


        }else{
            req.body.imagenPublicacion = ""
        }

        let nuevaPublicacion = new publicacionesModel(req.body)
        await nuevaPublicacion.save()
        res.send(nuevaPublicacion)
        console.log(nuevaPublicacion)

    } catch (error) {
        console.log('error', error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador' })
    }
}

exports.eliminarPublicacion = async (req, res) => {

    try {
        let dataPublicacion = await publicacionesModel.findById(req.params.idPublicacion)
        if (!dataPublicacion) {
            res.status(404).send({ error: 'No se encuentra la publicacion' })
            return
        }
        await publicacionesModel.findByIdAndDelete({ _id: req.params.idPublicacion })
        res.status(200).send({ msg: "Eliminado correctamente" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador' })
    }
}


exports.actualizarPublicacion = async (req, res) => {
    try {
























        if (req.params.idPublicacion.length == 24) {
            let dataPublicacion = await publicacionesModel.findById(req.params.idPublicacion)
            if (!dataPublicacion) {
                res.status(404).send({ error: "No se ha encontrado la publicacion" })
                return
            }
            const { textPublicacion, imagenPublicacion, comentario } = req.body
            dataPublicacion.textPublicacion = textPublicacion
            dataPublicacion.imagenPublicacion = imagenPublicacion
            dataPublicacion.comentario = comentario

            if (req.files.length != 0) {
                const imagenPublicacion = req.files
                console.log(req.files);
                let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
                req.body.imgPublicacion = imagenPublicacion.find((archivo) => {
                    return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
                })
                dataPublicacion.imagenPublicacion = `http://localhost:4000/assets/publicacion/${req.body.imgPublicacion.filename}`
            } else {
                dataPublicacion.imagenPublicacion = dataPublicacion.imagenPublicacion
            }

            dataPublicacion = await publicacionesModel.findOneAndUpdate({ _id: req.params.idPublicacion }, dataPublicacion, { new: true })
            res.json(dataPublicacion)
        } else {
            res.status(403).send({ error: "El id proporcionado no es valido" })
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
    }
}


exports.consultarUnaPublicacion = async (req, res) => {
    try {
        let dataPublicacion = await publicacionesModel.findById(req.params.idPublicacion)
        if (!dataPublicacion) {
            res.status(404).send({ error: "No se ha encontrado la publicacion" })

        } else {
            res.send(dataPublicacion)
        }
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ error: "Ha ocurrido algo, comuníquese con el administrador" })
        console.log("Constructed Image URL:", req.body.imagenPublicacion);
    }
}
