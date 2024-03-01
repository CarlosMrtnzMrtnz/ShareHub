const gruposModel = require('../models/gruposModel')
const publicacionesModel = require('../models/publicacionesModel')

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
        let imagenGrupo = req.files

        if (imagenGrupo == '' || imagenGrupo.length == 0) {
            imagenGrupo = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
        } else {
            console.log("******************************************************************");
            console.log(req.body);
            console.log(req.files);
            console.log("******************************************************************");
            let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
            req.body.imgGrupo = imagenGrupo.find((archivo) => {
                return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
            })
            req.body.imgGrupo = `http://localhost:4000/assets/grupos/${req.body.imgGrupo.filename}`
        }
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
                res.status(404).send({ error: "No se ha encontrado el grupo" })
                return
            }
            console.log("<<<<<<<<<<<<<");
            console.log(req.body);
            console.log("<<<<<<<<<<<<<");
            const { nombreGrupo, descripcionGrupo } = req.body
            dataGrupo.nombreGrupo = nombreGrupo
            dataGrupo.descripcionGrupo = descripcionGrupo


            if (req.body.miembros) {
                dataGrupo.miembros = req.body.miembros.split(",")
            }


            if (req.files.length != 0) {
                const imagenGrupo = req.files
                console.log(req.files);
                let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "mp4", "gif"]
                req.body.imgGrupo = imagenGrupo.find((archivo) => {
                    return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
                })
                dataGrupo.imgGrupo = `http://localhost:4000/assets/grupos/${req.body.imgGrupo.filename}`

                console.log("******************************************************************");
                console.log(dataGrupo);

            } else {
                dataGrupo.imgGrupo = dataGrupo.imgGrupo
            }

            // -----------------------------------------


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
        console.log("Constructed Image URL:", req.body.imgGrupo);
    }
}

exports.eliminarMiembroDeGrupo = async (req, res) => {
    try {
        // Encuentra el grupo por su id
        const grupo = await gruposModel.findById(req.params.grupoId);

        // Verifica si el grupo existe
        if (!grupo) {
            return res.status(404).json({ mensaje: 'Grupo no encontrado' });
        }

        // filtra la lista de miembros para excluir al miembro a eliinar
        grupo.miembros = grupo.miembros.filter((id) => id.toString() !== req.params.miembroId);

        // guardar el grupo actualizado en la base de datos
        await grupo.save();

        res.json({ mensaje: 'Miembro eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.crearPublicacionGrupo = async (req, res) => {
    try {
        const imagenPublicacion = req.files

        if (imagenPublicacion.length > 0 && imagenPublicacion != "") {
            let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
            req.body.imgPublicacion = imagenPublicacion.find((archivo) => {
                return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
            })

            req.body.imagenPublicacion = `http://localhost:4000/assets/publicacion/${req.body.imgPublicacion.filename}`


        } else {
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

exports.consultarPublicacionesGrupo = async (req, res) => {
    try {
        const { tipoPublicacion } = req.query; // Cambiado de body a query
        let dataPublicacion;

        if (tipoPublicacion !== undefined) {
            // Filtrar por tipo de publicación y pertenencia a grupos
            dataPublicacion = await publicacionesModel.find({
                tipoPublicacion: tipoPublicacion === 'true',
                idGrupo: req.params.grupoId // Asegúrate de tener el campo idGrupo en tu modelo de publicaciones
            });
        } else {
            // Obtener todas las publicaciones del grupo
            dataPublicacion = await publicacionesModel.find({ idGrupo: req.params.grupoId });
        }

        res.json(dataPublicacion);
    } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador' })
}
}


