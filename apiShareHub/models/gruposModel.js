const mongoose = require('mongoose')

const gruposModel = mongoose.Schema({
    nombreGrupo:{
        type: String,
        required: true
    },
    descripcionGrupo: {
        type: String,
        required: false
    },
    imgGrupo:{
        type: String,
        required: false
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('grupo', gruposModel)


