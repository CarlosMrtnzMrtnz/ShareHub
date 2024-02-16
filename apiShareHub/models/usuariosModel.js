const mongoose = require('mongoose')

const usuariomodelo =mongoose.Schema({
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
    }
},{
    timestamps :true,
    versionkey:false    
})
module.exports = mongoose.model('usuario', usuariomodelo)
