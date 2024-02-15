const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config.env' })

exports.verificarToken = (req, res, next) =>{
    let token = req.headers.authorization
    token = token.split(' ')

    if (!token) {
        return res.status(403).send({error: "Token de seguridad invalido (no se envio token)"})        
    }
    jwt.verify(token[1], process.env.SECRET_KEY_JWT, (err, decoded) =>{
        if(err) {
            return res.status(403).send({error: "token de sefuridad invalido"})
        }
        req.usuario = decoded
        next()
    })
}
