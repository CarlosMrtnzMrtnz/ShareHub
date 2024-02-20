const { body, validationResult } = require('express-validator');

exports.validateUsuario = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('CorreoUser').notEmpty().withMessage('El correo es obligatorio'),
    body('clave').notEmpty().withMessage('La clave es obligatoria'),
];

