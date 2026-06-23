const Post = require('../models/post.model');

const createPost = async (req, res) => {
    try {
        const {description, userId, images} = req.body;
        const newPost = new Post({
            description,
            user: userId,
            images : images || []
        });

        const postSaved = await newPost.save();
        res.status(201).json({message: 'Post creado con éxito', data: postSaved});
    } catch (error) {
        res.status(400).json({message: 'Error al crear el post', error: error.message});
    }
};

const getAllPosts = async (req,res) => {
    try{
        const posts = await Post.find()
        .populate("user", "nickName nombre")
        .populate("tags", "nombre")
        .sort({createdAt: -1});
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: 'Error al obtener los posts', error: error.message});
    }
};

const getPostById = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate("user", "nickName nombre")
        .populate("tags", "nombre");

        if (!post) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json({message: 'Error de servidor (ID inválido)', error: error.message});
    }
};

const getPostsByUserId = async(req,res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({user: userId})
        .populate("user", "nickName nombre")
        .populate("tags", "nombre")
        .sort({createdAt: -1});

        if (posts.length === 0) {
            return res.status(404).json({message: 'Este usuario no tiene publicaciones o no existe'});
        } 
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: 'Error al buscar las publicaciones', error: error.message});
    }
};

const updatePost = async (req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' , runValidators: true}
        );

        if(!updatedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({message: 'Post actualizado', data: updatedPost});
    } catch(error) {
        res.status(400).json({message:'Error al actualizar', error: error.message});
    }
};

const deletePost = async (req,res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({ message: 'Post eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar', error: error.message});
    }
};

const addTagToPost = async(req,res) => {
    try {
        const {postId, tagId} = req.params;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$push: {tags: tagId}},
            {returnDocument: 'after' }
        );
        if (!updatedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({message: 'Tag agregado', data: updatedPost});
    } catch(error) {
        res.status(500).json({message: 'Error al agregar tag', error: error.message});
    }
};

const removeTagFromPost = async(req,res) => {
    try {
        const {postId, tagId} = req.params;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$pull: {tags: tagId}},
            { returnDocument: 'after' }
        );
        if (!updatedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({message: 'Tag eliminado', data: updatedPost});
    } catch(error) {
        res.status(500).json({message: 'Error al remover tag', error: error.message});
    }
};

const addImagesToPost = async(req,res) => {
    try {
        const {postId} = req.params;
        const {urls} = req.body;
        
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return res.status(400).json({message: 'Debes enviar una o más URLs válidas '});
        }

        const newImages = urls.map(url => ({url}));

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$push: {images: {$each: newImages}}},
            {returnDocument: 'after', runValidators: true}
        );

        if (!updatedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({message: 'Imágenes agregadas con éxito', data: updatedPost});
    } catch(error) {
        res.status(500).json({message: 'Error al agregar imágenes', error: error.message});
    }
};

const removeImagesFromPost = async(req,res) => {
    try {
        const {postId} = req.params;
        const {imageIds} = req.body;

        if (!imageIds || !Array.isArray(imageIds)) {
            return res.status(400).json({message: 'Debes indicar los IDs de las imágenes a eliminar'});
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$pull: {images: {_id: {$in: imageIds}}}},
            { returnDocument: 'after' }
        );

        if (!updatedPost) return res.status(404).json({message: 'Post no encontrado'});
        res.status(200).json({message: 'Imágenes eliminadas', data: updatedPost});
    } catch(error) {
        res.status(500).json({message: 'Error al eliminar imágenes', error: error.message});
    }
};

//Sistema de antireacciones
const reactToPost = async (req,res) => {
    try {
        const {postId} = req.params;
        const {userId, reactionType} = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({message: 'Post no encontrado'});

        const existingReactionIndex = post.reactions.findIndex((reaction) => reaction.user.toString() === userId);

        if (existingReactionIndex !== -1) {
            const existingReaction = post.reactions[existingReactionIndex];
        
        if (existingReaction.reactionType === reactionType) {
            post.reactions.splice(existingReactionIndex, 1);
            await post.save();
            return res.status(200).json({message: 'Reacción retirada', data: post});
        } else {
            post.reactions[existingReactionIndex].reactionType = reactionType;
            await post.save();
            return res.status(200).json({message: 'Reacción actualizada', data: post});
        }
        } else {
            post.reactions.push({user: userId, reactionType: reactionType});
            await post.save();
            return res.status(200).json({message: 'Reacción agregada', data: post});
        }
    } catch(error) {
        res.status(400).json({message: 'Error al procesar reacción', error: error.message});
    }
};

module.exports = { 
    createPost, getAllPosts, getPostById, 
    getPostsByUserId, updatePost, deletePost, 
    addTagToPost, removeTagFromPost, 
    addImagesToPost, removeImagesFromPost, 
    reactToPost
};