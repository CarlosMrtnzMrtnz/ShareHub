const mongoose = require('mongoose')

const UsuariosModel =mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    CorreoUser:{
        type: String,
        require: true
    },
    clave:{
        type: String,
        require: true
    },
    imguser:{
        type : String,
        require: false
    },
    descripcionuser: {
        type: String,
        require: false
    },
    amigos:{
        type: Array,
        require:false
    }
},{
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('usuario', UsuariosModel)
