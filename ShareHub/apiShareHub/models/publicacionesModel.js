const mongoose = require('mongoose')

const publicacionesSchema = mongoose.Schema({
    idUsuario: {
        type: String,
        require: true
    },
    imagenPublicacion: {
        type: String,
        require: false
    },
    textPublicacion: {
        type: String,
        require: false
    },
    comentario:{
        type: Array,
        require: false
    },
    tipoPublicacion:{
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('publicacione', publicacionesSchema)

// {
//     "nombre": "Carlos Martinez",
//     "imagenUsuario":"https://cdn0.psicologia-online.com/es/posts/8/5/1/como_desenamorarse_de_alguien_rapido_5158_600.jpg" ,
//     "imagenPublicacion": "https://laopinion.com/wp-content/uploads/sites/3/2022/03/nostalgia.jpg?resize=360,202&quality=80",
//     "textoPublicacion": "publicacion de prueba"
// }
