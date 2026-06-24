const { Router } = require('express');
const tagCon = require('../controllers/tag.controller');
const validateObjectId = require('../middlewares/validateObjectId');

const router = Router();

router.get('/', tagCon.getTags);
router.get('/:id', validateObjectId, tagCon.getTagById);
router.post('/', tagCon.createTag);
router.put('/:id', validateObjectId, tagCon.updateTag);
router.delete('/:id', validateObjectId, tagCon.deleteTag);

module.exports = router;