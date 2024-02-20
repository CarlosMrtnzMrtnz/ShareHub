const publicacionesModel = require('../models/publicacionesModel')

exports.crearPulicacion = async (req, res) => {

    try {
        const imagenPublicacion = req.files

        let extensionesPermitidas = ["jpg", "png", "gif", "jpeg", "webp", "jfif"]
        req.body.imgPublicacion = imagenPublicacion.find((archivo) => {
            return extensionesPermitidas.includes(archivo.mimetype.split('/').pop())
        })

        req.body.imgPublicacion = `http://localhost:4000/uploads/${req.body.imagenPublicacion.filename}`


        let nuevaPublicacion = new publicacionesModel(req.body)
        await nuevaPublicacion.save()
        res.send(nuevaPublicacion)
        console.log(nuevaPublicacion)

    } catch (error) {
        console.log('error',error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador'})
    }
}

exports.eliminarPublicacion = async(req, res) => {

    try {
        let dataPublicacion = await publicacionesModel.findById(req.params.idPublicacion)
        if(!dataPublicacion) {
            res.status(404).send({error: 'No se encuentra la publicacion'})
            return
        }
        await publicacionesModel.findByIdAndDelete({_id: req.params.idPublicacion})
        res.status(200).send({msg:"Eliminado correctamente"})

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador'})
    }
}


exports.actualizarPublicacion = async (req, res) => {
    try {
        if (req.params.publicacionId.length == 24) {
            let dataPublicacion = await publicacionesModel.findById(req.params.idPublicacion)

            if (!dataPublicacion) {
                res.status(404).send({ error: "No se ha encontrado la publicacion" })
                return
            }
            const { nombre, imagenUsuario, imagenPublicacion, textoPublicacion } = req.body

            dataPublicacion.nombre = nombre
            dataPublicacion.imagenUsuario = imagenUsuario
            dataPublicacion.imagenPublicacion = imagenPublicacion
            dataPublicacion.textoPublicacion = textoPublicacion

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






// exports.buscarUsuario = async (req, res) => {

//     try {
//         let dataUsuario = await publicacionesModel.find()
//         res.json(dataUsuario)
        
//     } catch (error) {
        
//     console.log(error);
//     res.status(500).send({error:'Ha ocurrido un error, comuniquese con el administrador'})
//     }
// }
