const Usuario = require("../models/Usuario");

const validarIdUsuario = async (req, res, next) => {
    try {
        const {id} = req.params; 
        const usuario = await Usuario.findById(id); 
        if(!usuario) {
            return res.status(400).json({message : "Usuario no encontrado"})
        }
        req.usuario = usuario;
        next()
    } catch (error) {
        return res.status(500).json({
            message : "Error al obtener el usuario", 
            error : error.message
        })
    }
}

module.exports = validarIdUsuario