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
        ref: 'Usuario', 
        required: [true, 'El autor del post es obligatorio']
    },
    images: [postImageSchema],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag' 
    }],

    //SISTEMA DE ANTIREACCIONES
    reactions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
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

const Post = mongoose.model('Post', postSchema);
module.exports = Post
