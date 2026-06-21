const Usuario = require('../models/Usuario')
const createUsuario = async(req, res) => {
    try {
        const user = await Usuario.create(req.body);
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error : "Error al crear usuario"})
    }
}

const getUsuarios = async (req, res) => {
    try {
        const users = await Usuario.find().select("-createdAt -updatedAt -__v")
    res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error : "Error al obtener usuarios"})
    }
}

const getUsuarioId = async (req, res) => {
    const usuario = req.usuario.toObject(); 
    delete usuario.createdAt; 
    delete usuario.updatedAt; 
    delete usuario.__v; 
    res.status(200).json({usuario})
}

const updateUsuario = async(req, res) => {
    try{
        const {id} = req.params
        const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
            new : true, 
            runValidators:true,
        }); 
        if(!usuario){
            return res.status(404).json({message : "Usuario no encontrado"})
        }
        res.status(200).json({message : "Usuario actualizado con exito!!"})
    } catch {
        res.status(500).json({
            error : "Error al actualizar el usuario"
        })
    }
}

const deleteUsuario = async(req, res) => {
    try {
        const {id} = req.params 
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        if(!usuarioEliminado){
            return res.status(404).json({message : "Usuario no encontrado"});
        }
        res.status(200).json({message : "Usuario eliminado"})
    } catch (error) {
        res.status(500).json({
            message : "Error a eliminar el usuario",
            error : error.message
        })
    }
}

module.exports = {
    createUsuario, 
    getUsuarios, 
    getUsuarioId,
    updateUsuario, 
    deleteUsuario
}