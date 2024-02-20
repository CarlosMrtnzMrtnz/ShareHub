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
    }
},{
    timestamps :true,
    versionkey:false    
})
UsuariosModel.statics.findUserByEmail = async function(email) {
    try {
     
        return await this.findOne({ CorreoUser: email });
        
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};
module.exports = mongoose.model('usuario', UsuariosModel)
