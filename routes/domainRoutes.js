// routes/domainRoutes.js
const express = require('express');
const router = express.Router();
const {
  searchDomain,
  valuateDomain,
  backorderDomain,
  bulkSearch,
} = require('../controllers/domainController');

router.get('/search', searchDomain);
router.post('/valuate', valuateDomain);
router.post('/backorder', backorderDomain);
router.post('/bulk', bulkSearch);

module.exports = router;