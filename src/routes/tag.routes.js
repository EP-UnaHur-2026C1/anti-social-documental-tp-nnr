const { Router } = require('express');
const tagCon = require('../controllers/tag.controller');
const validateObjectId = require('../middlewares/validateObjectId');

const router = Router();
/**
 * @swagger
 * /api/tag : 
 *  get : 
 *      summary : Obtener tags
 *      tags : [Tag]
 *      responses : 
 *          200 : 
 *              description : Lista de tags
*/
router.get('/', tagCon.getTags);

/**
 * @swagger
 * /api/tag/{id} : 
 *  get : 
 *      summary : Obtener tag por id 
 *      tags : [Tag]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del tag en la base de datos 
 *            schema :
 *              type : integer
 *              example : 1
 *      responses : 
 *          200 : 
 *              description : Tag encontrado
*/
router.get('/:id', validateObjectId, tagCon.getTagById);

/** 
 * @swagger 
 * /api/tag: 
 *  post: 
 *      summary : Crear tag
 *      tags : [Tag]
 *      requestBody: 
 *          required: true
 *          content : 
 *              application/json: 
 *                  schema: 
 *                      type: object
 *                      required : 
 *                          -nombre
 *                      properties : 
 *                          nombre : 
 *                              type : string 
 *                              minLength: 3
 *                              maxLength : 10
 *  
 *      responses : 
 *          201:
 *              description : Tag creado correctamente         
*/
router.post('/', tagCon.createTag);

/**
 * @swagger
 * /api/tag/{id} : 
 *  put : 
 *      summary : Actualizar tag por id
 *      tags : [Tag]
 *      
 *      parameters : 
 *          - in : path 
 *            name : id
 *            required : true 
 *            description : ID del tag
 *            schema : 
 *              type : integer 
 *              example : 1 
 *      requestBody : 
 *          required : true 
 *          content : 
 *              application/json : 
 *                  schema : 
 *                      type : object
 *                      properties : 
 *                          nombre : 
 *                              type : string
 *                              minLength : 3
 *                              maxLength : 10
 *      responses : 
 *          200 :
 *              description : Tag actualizado correctamente 
 *          404 : 
 *              description : Tag no encontrado 
*/
router.put('/:id', validateObjectId, tagCon.updateTag);

/**
 * @swagger
 * /api/tag/{id} : 
 *  delete : 
 *      summary : Eliminar Tag por id 
 *      tags : [Tag]
 *      parameters : 
 *          - in : path
 *            name : id
 *            required : true
 *            description : ID del tag en la base de datos 
 *            schema :
 *              type : integer
 *              example : 1
 *      responses : 
 *          200 : 
 *              description : Tag eliminado correctamente
 *          404 : 
 *              description : Tag no encontrado 
*/
router.delete('/:id', validateObjectId, tagCon.deleteTag);

module.exports = router;