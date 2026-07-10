const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeatured,
  getPopular,
} = require('../controllers/propertyController');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeatured);
router.get('/popular', getPopular);
router.get('/:id', getPropertyById);

// Admin routes
router.post('/', auth, isAdmin, createProperty);
router.put('/:id', auth, isAdmin, updateProperty);
router.delete('/:id', auth, isAdmin, deleteProperty);

module.exports = router;