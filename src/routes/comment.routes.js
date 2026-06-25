const { Router } = require('express');
const commentCon = require('../controllers/comment.controller');
const validateObjectId = require('../middlewares/validateObjectId');

const router = Router();

/**
 * @swagger
 * /api/comment : 
 *  get : 
 *      summary : Obtener comentarios
 *      tags : [Comentarios]
 *      responses : 
 *          200 : 
 *              description : Lista de comentarios
*/
router.get('/', commentCon.getComments);

/**
 * @swagger
 * /api/comment/{id} : 
 *  get : 
 *      summary : Obtener comentario por id 
 *      tags : [Comentarios]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del comentario en la base de datos 
 *            schema :
 *              type : integer
 *              example : 1
 *      responses : 
 *          200 : 
 *              description : Comentario encontrado
*/
router.get('/:id', validateObjectId, commentCon.getCommentById);

/**
 * @swagger
 * /api/comment:
 *   post:
 *     summary: Crear comentario
 *     tags: [Comentarios]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - descripcion
 *               - visible
 *               - postId
 *               - userNickName
 *
 *             properties:
 *
 *               descripcion:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Muy buen post"
 *
 *               visible:
 *                 type: boolean
 *                 description: Indica si el comentario está visible
 *                 example: true
 *
 *               postId:
 *                 type: string
 *                 description: ID del post asociado al comentario
 *                 example: "891nfdwniao"
 *
 *               userId:
 *                 type: string
 *                 description: Id del usuario que realizó el comentario
 *                 example: "2981931290jeiadio"
 *
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 */
router.post('/', commentCon.createComment);

/**
 * @swagger
 * /api/comment/{id}:
 *   put:
 *     summary: Crear comentario
 *     tags: [Comentarios]
 *     parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del comentario en la base de datos 
 *            schema :
 *              type : string
 *              example : "asiodns98990"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - descripcion
 *               - visible
 *               - postId
 *               - userNickName
 *
 *             properties:
 *
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Muy buen post"
 *
 *               visible:
 *                 type: boolean
 *                 description: Indica si el comentario está visible
 *                 example: true
 *
 *               postId:
 *                 type: string
 *                 description: ID del post asociado al comentario
 *                 example: "ijdoiaswqo3232"
 *
 *               userId:
 *                 type: string
 *                 description: Id del usuario que realizó el comentario
 *                 example: "i18jfdniafnd23"
 *
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente
 *       404:
 *         description : Comentario no encontrado
 */
router.put('/:id', validateObjectId, commentCon.updateComment);

/**
 * @swagger
 * /api/comment/{id} : 
 *  delete : 
 *      summary : Eliminar comentario por id 
 *      tags : [Comentarios]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del Comentario en la base de datos 
 *            schema :
 *              type : string
 *              example : "981039nindaod"
 *      responses : 
 *          200 : 
 *              description : Comentario eliminado correctamente
 *          404 :
 *              description : Comentario no encontrado
*/
router.delete('/:id', validateObjectId, commentCon.deleteComment);

module.exports = router;