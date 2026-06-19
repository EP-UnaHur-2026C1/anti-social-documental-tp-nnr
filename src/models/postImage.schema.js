const mongoose = require('mongoose');

const postImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required:[true, 'La URL de la imagen es obligatoria.'],
        trim: true,
        match: [/^https?:\/\/.+/, 'La imagen debe ser una dirección URL válida (http:// o https://)']
    }
});

module.exports = postImageSchema;