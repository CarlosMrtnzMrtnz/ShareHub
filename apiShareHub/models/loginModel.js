const { default: mongoose } = require("mongoose")

const loginModelSchema = mongoose.Schema ({
    nombre: {
        type: String,
        require: true
    },
    clave: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionkey: false
})

module.exports = mongoose.model('login', loginModelSchema)
