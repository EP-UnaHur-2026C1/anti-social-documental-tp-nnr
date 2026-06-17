const {Router} = require('express'); 
const { createUsuario, getUsuarios, getUsuarioId, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const validarIdUsuario = require('../middlewares/validarIdUsuario.middleware');
const router = Router(); 

router.post('/usuarios', createUsuario)
router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', validarIdUsuario, getUsuarioId)
router.patch('/usuarios/:id', validarIdUsuario, updateUsuario)
router.delete('/usuarios/:id', validarIdUsuario, deleteUsuario)

module.exports = router;