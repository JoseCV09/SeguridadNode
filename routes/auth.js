const { Router } = require('express');
const { login, createUser, getUsuarios, getUsuariosById, deleteUsuarios, updateUsuarios } = require('../controllers/authController');

const router = Router();

router.post('/sign-in', login)
router.post('/sign-up', createUser)

router.get('/get-users', getUsuarios)
router.get('/get-users/:idusuario', getUsuariosById)
router.delete('/delete-users/:idusuario', deleteUsuarios)
router.put('/update-users/:idusuario', updateUsuarios)

module.exports = router;