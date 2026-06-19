const mongoose = require('mongoose');

const postImageSchema = require('./postImage.schema');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Revisar que se llame así el modelo
        required: [true, 'El autor del post es obligatorio']
    },
    images: [postImageSchema],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag' //Revisar que se llame así el modelo
    }],

    //SISTEMA DE ANTIREACCIONES
    reactions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reactionType: {
            type: String,
            enum: ['yawn', 'angry', 'vomit', 'boo'],
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
