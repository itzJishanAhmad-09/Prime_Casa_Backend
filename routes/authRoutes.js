const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;