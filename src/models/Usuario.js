const mongoose = require('mongoose'); 

const usuarioSchema = new mongoose.Schema({
    nickName : {
        type : String,
        unique : true, 
        required : [true, "El nick name es obligatorio"]
    }, 
    nombre : {
        type : String, 
        required : [true, "El nombre es obligatorio"]
    }, 
    email : {
        type : String, 
        unique : true, 
        required : [true, "El email es obligatorio"],
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ingresar un email válido"]
    }, 
    password : {
        type : String, 
        required : [true, "La contraseña es obligatoria"]
    }
}, {
    timestamps : true
})

const Usuario = mongoose.model("Usuario", usuarioSchema); 
module.exports = Usuario