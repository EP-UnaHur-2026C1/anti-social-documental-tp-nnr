const {Router} = require('express'); 
const { createUsuario, getUsuarios, getUsuarioId, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const validarIdUsuario = require('../middlewares/validarIdUsuario.middleware');
const router = Router(); 

router.post('/', createUsuario)
router.get('/', getUsuarios)
router.get('/:id', validarIdUsuario, getUsuarioId)
router.patch('/:id', validarIdUsuario, updateUsuario)
router.delete('/:id', validarIdUsuario, deleteUsuario)

module.exports = router;