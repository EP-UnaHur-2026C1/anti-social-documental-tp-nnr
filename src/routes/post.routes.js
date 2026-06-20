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

    router.get('/', getAllPosts);
    router.post('/', createPost);

    router.get('/user/:userId', getPostsByUserId);

    router.get('/:id', getPostById);
    router.put('/:id', updatePost);
    router.delete('/:id', deletePost);

    router.post('/:postId/tags/:tagId', addTagToPost);
    router.delete('/:postId/tags/:tagId', removeTagFromPost);

    router.post('/:postId/images', addImagesToPost);
    router.delete('/:postId/images', removeImagesFromPost);
    
    router.post('/:postId/react', reactToPost);

    module.exports = router;
