const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

// Admin routes for analytics
router.get('/dashboard', auth, isAdmin, analyticsController.getDashboardStats);
router.get('/properties', auth, isAdmin, analyticsController.getPropertyAnalytics);
router.get('/enquiries', auth, isAdmin, analyticsController.getEnquiryAnalytics);
router.get('/domains', auth, isAdmin, analyticsController.getDomainAnalytics);
router.get('/users', auth, isAdmin, analyticsController.getUserAnalytics);
router.get('/revenue', auth, isAdmin, analyticsController.getRevenueAnalytics);
router.get('/traffic', auth, isAdmin, analyticsController.getTrafficAnalytics);

module.exports = router;