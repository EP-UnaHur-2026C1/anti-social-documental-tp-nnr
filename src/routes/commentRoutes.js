const { Router } = require('express');
const commentCon = require('../controllers/commentController');
const validateObjectId = require('../middlewares/validateObjectId');

const router = Router();

router.get('/', commentCon.getComments);
router.get('/:id', validateObjectId, commentCon.getCommentById);
router.post('/', commentCon.createComment);
router.put('/:id', validateObjectId, commentCon.updateComment);
router.delete('/:id', validateObjectId, commentCon.deleteComment);

module.exports = router;