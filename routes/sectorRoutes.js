// routes/sectorRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');

// ✅ Import the controller functions
const { 
  getSectors, 
  getSectorById, 
  createSector, 
  updateSector, 
  deleteSector 
} = require('../controllers/sectorController');

// Routes
router.get('/', getSectors);
router.get('/:id', getSectorById);
router.post('/', auth, isAdmin, createSector);
router.put('/:id', auth, isAdmin, updateSector);
router.delete('/:id', auth, isAdmin, deleteSector);

module.exports = router;