const { Router } = require('express');
const { login, createUser} = require('../controllers/authController');

const router = Router();

router.post('/sign-in', login)
router.post('/sign-up', createUser)

module.exports = router;