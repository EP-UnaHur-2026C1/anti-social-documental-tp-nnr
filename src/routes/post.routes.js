const express = require('express');
const router = express.Router();
const {
    createPost, 
    getAllPosts, 
    getPostById, 
    getPostsByUserId, 
    updatePost, 
    deletePost,
    addTagToPost,
    removeTagFromPost,
    addImagesToPost,
    removeImagesFromPost,
    reactToPost} = require('../controllers/post.controller');

    //const validarBodyPost = require('../middlewares/validatePost');
    const validateObjectId = require ('../middlewares/validateObjectId');

    router.get('/', getAllPosts);
    router.post('/', createPost);

    router.get('/user/:userId', getPostsByUserId);

    router.get('/:id', validateObjectId, getPostById);
    router.put('/:id', validateObjectId, updatePost);
    router.delete('/:id', validateObjectId, deletePost);

    router.post('/:postId/tags/:tagId', addTagToPost);
    router.delete('/:postId/tags/:tagId', removeTagFromPost);

    router.post('/:postId/images', addImagesToPost);
    router.delete('/:postId/images', removeImagesFromPost);
    
    router.post('/:postId/react', reactToPost);

    module.exports = router;
