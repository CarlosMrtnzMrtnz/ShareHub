const publicacionesModel = require('../models/publicacionesModel')

exports.crearPulicacion = async (req, res) => {

    try {
        let nuevaPublicacion = new publicacionesModel(req.body)
        await nuevaPublicacion.save()
        res.send(nuevaPublicacion)

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador'})
    }
}

exports.eliminarPublicacion = async(req, res) => {

    try {
        let dataPublicacion = await publicacionesModel.findById(req.params.idProducto)
        if(!dataPublicacion) {
            res.status(404).send({error: 'No se encuentra la publicacion'})
            return
        }
        await publicacionesModel.findByIdAndDelete({_id: req.params.idProducto})
        res.status(200).send({msg:"Eliminado correctamente"})

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Ha ocurrido un error, comunicate con el administrador'})
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
