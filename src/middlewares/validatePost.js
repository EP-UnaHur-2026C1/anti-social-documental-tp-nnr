const Post = require('../models/post.model');
const Usuario = require('../models/Usuario');

const validarBodyPost = async(req, res, next) => {
    try{
        if (req.body.userId) {
            req.body.user = req.body.userId;
        }

        if (req.body.user) {
            const existeUsuario = await Usuario.findById(req.body.user);
            if (!existeUsuario) {
                return res.status(404).json({
                    message: "Error de validación",
                    errors: ["El usuario no existe en la base de datos."]
                });
            }
        }
        
        const postTemporal = new Post(req.body);
        await postTemporal.validate();
        next();
    } catch (error) {
        if (error.name === 'ValidationError') {
            const mensajesDeError = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Error de validación en los datos del post',
                errors: mensajesDeError
            });
        }
        return res.status(500).json({
            message: 'Error interno al validar el post',
            error: error.message
        });
    }
};

module.exports = validarBodyPost;