// routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const enquiryController = require('../controllers/enquiryController');

// Routes
router.get('/', auth, isAdmin, enquiryController.getEnquiries);
router.get('/:id', auth, isAdmin, enquiryController.getEnquiryById);
router.post('/', enquiryController.createEnquiry); // Public route
router.put('/:id', auth, isAdmin, enquiryController.updateEnquiry);
router.delete('/:id', auth, isAdmin, enquiryController.deleteEnquiry);
router.patch('/:id/status', auth, isAdmin, enquiryController.updateEnquiryStatus);

module.exports = router;