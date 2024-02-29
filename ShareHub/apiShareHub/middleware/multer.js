const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const directorioApiArchivo = req.params.directorio
        switch (directorioApiArchivo) {
            case "grupo":
                cb(null, "uploads/grupos")
                break;
            case "perfil":
                cb(null, "uploads/perfil")
                break; 
            case "publicacion":
                cb(null, "uploads/publicacion")
                break;
            default:
                cb(null, "uploads")
                break;
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = upload
