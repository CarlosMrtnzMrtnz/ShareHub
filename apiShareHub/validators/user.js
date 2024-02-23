const { body, validationResult } = require('express-validator');
const usuariosModel = require('../models/usuariosModel')

exports.validateUsuario = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('CorreoUser').notEmpty().isEmail().withMessage('El correo es obligatorio'),
    body('CorreoUser').custom(async value => {
        const user = await usuariosModel.findUserByEmail(value);
        
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    
    body('clave').notEmpty().withMessage('La clave es obligatoria'),
];

