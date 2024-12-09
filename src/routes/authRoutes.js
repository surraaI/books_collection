const express = require('express');
const router = express.Router();

const { login, logout, signup, create_admin ,assign_admin } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/middlewares');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/create_admin', authenticateToken, create_admin);
router.post('/assign_admin', authenticateToken, assign_admin);

module.exports = router;