const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const testimonialController = require('../controllers/testimonialController');

// Routes
router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', auth, isAdmin, testimonialController.createTestimonial);
router.put('/:id', auth, isAdmin, testimonialController.updateTestimonial);
router.delete('/:id', auth, isAdmin, testimonialController.deleteTestimonial);

module.exports = router;