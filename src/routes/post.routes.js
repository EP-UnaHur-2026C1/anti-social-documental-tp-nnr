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
    reactToPost
} = require('../controllers/post.controller');

const validarBodyPost = require('../middlewares/validatePost');
const validateObjectId = require ('../middlewares/validateObjectId');
const {checkCache, deleteCache} = require('../middlewares/redis.middleware');
/**
 * @swagger
 * /api/posts : 
 *  get : 
 *      summary : Obtener posts
 *      tags : [Post]
 *      responses : 
 *          200 : 
 *              description : Lista de post
*/
router.get('/', getAllPosts);

/** 
 * @swagger 
 * /api/posts: 
 *  post: 
 *      summary : Crear Post
 *      tags : [Post]
 *      requestBody: 
 *          required: true
 *          content : 
 *              application/json: 
 *                  schema: 
 *                      type: object
 *                      required : 
 *                          -desciption
 *                          -userNickName
 *                      properties : 
 *                          description : 
 *                              type : string
 *                              minLength : 3
 *                              maxLength : 100
 *                          userId : 
 *                              type : string 
 *                              minLength : 3
 *                              maxLength : 20                          
 *      responses : 
 *          201:
 *              description : Post creado correctamente         
*/
router.post('/', validarBodyPost, createPost);

/** 
 * @swagger 
 * /api/posts/user/{id}: 
 *  get : 
 *      summary : Obtener post por id del usuario 
 *      tags : [Post]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del usuario en la base de datos 
 *            schema :
 *              type : string
 *              example : 823hdas382903j
 *      responses : 
 *          200 : 
 *              description : Post del usuario encontrado encontrado
 *          400 : 
 *              description : ID invalido
 *          404 : 
 *              description : Post del usuario no encontrado        
*/


router.get('/user/:userId', getPostsByUserId);


/**
 * @swagger
 * /api/posts/{id} : 
 *  get : 
 *      summary : Obtener post por id 
 *      tags : [Post]
 *      parameters : 
 *          - in : path
 *            name : string
 *            required : true
 *            description : ID del post en la base de datos 
 *            schema :
 *              type : string
 *              example : 88233uisddf8892
 *      responses : 
 *          200 : 
 *              description : Post encontrado
 *          400 : 
 *              description : Id del post no encontrado
 *          404 : 
 *              description : Post no encontrado 
*/
router.get('/:id', validateObjectId, checkCache, getPostById);

/**
 * @swagger
 * /api/posts/{id} : 
 *  put : 
 *      summary : Actualizar post por id
 *      tags : [Post]
 *      
 *      parameters : 
 *          - in : path 
 *            name : id
 *            required : true 
 *            description : ID del Post
 *            schema : 
 *              type : string
 *              example : 939923jiunsd992
 *      requestBody : 
 *          required : true 
 *          content : 
 *              application/json : 
 *                  schema : 
 *                      type : object
 *                      properties : 
 *                         description : 
 *                            type : string
 *                            minLength : 3
 *                            maxLength : 100
 *      responses : 
 *          200 :
 *              description : Post actualizado correctamente 
 *          404 : 
 *              description : Post no encontrado 
*/
router.put('/:id', validateObjectId, deleteCache, updatePost);

/**
 * @swagger
 * /api/posts/{id} : 
 *  delete : 
 *      summary : Eliminar post por id 
 *      tags : [Post]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del Post en la base de datos 
 *            schema :
 *              type : string
 *              example : 1
 *      responses : 
 *          200 : 
 *              description : Post eliminado correctamente
 *          404 : 
 *              description : Post no encontrado 
*/
router.delete('/:id', validateObjectId, deleteCache, deletePost);

/**
 * @swagger
 * /api/posts/{postId}/tags/{tagId}:
 *   post:
 *     summary: Agregar tag a un post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post al que se le agregará el tag
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a12345678"
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID del tag que se agregará al post
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a87654321"
 *     responses:
 *       200:
 *         description: Tag agregado al post correctamente
 */
router.post('/:postId/tags/:tagId', addTagToPost);
/**
 * @swagger
 * /api/posts/{postId}/tags/{tagId}:
 *   delete:
 *     summary: Eliminar tag de un post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post al que se le agregará el tag
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a12345678"
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID del tag que se agregará al post
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a87654321"
 *     responses:
 *       200:
 *         description: Tag eliminado del post correctamente
*/
/**
 * @swagger
 * /api/posts/{postId}/tags/{tagId}:
 *   delete:
 *     summary: Eliminar tag de un post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post al que se le agregará el tag
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a12345678"
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID del tag que se agregará al post
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a87654321"
 *     responses:
 *       200:
 *         description: Tag eliminado del post correctamente
*/
router.delete('/:postId/tags/:tagId', removeTagFromPost);

/**
 * @swagger
 * /api/posts/{postId}/images:
 *   post:
 *     summary: Agregar imágenes a un post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post al que se le agregarán las imágenes
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a12345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - urls
 *             properties:
 *               urls:
 *                 type: array
 *                 description: Lista de imágenes para el post
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://cdn.miapp.com/images/post1.jpg"
 *                   - "https://cdn.miapp.com/images/post2.png"
 *                   - "https://cdn.miapp.com/images/post3.webp"
 *     responses:
 *       200:
 *         description: Imágenes agregadas al post correctamente
*/
router.post('/:postId/images', addImagesToPost);
/**
 * @swagger
 * /api/posts/{postId}/images:
 *   delete:
 *     summary: Eliminar tag de un post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post al que se le agregará el tag
 *         schema:
 *           type: string
 *           example: "685c9f3f2b5a9d1a12345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageIds
 *             properties:
 *               imageIds:
 *                 type: string
 *                 description: Id de las imagenes a eliminar
 *                 items:
 *                   type: string
 *                 example:
 *                   - "910310idijaifq"
 *     responses:
 *       200:
 *         description: Imagen eliminada del post correctamente
*/
router.delete('/:postId/images', removeImagesFromPost);

router.post('/:postId/react', reactToPost);

module.exports = router;
