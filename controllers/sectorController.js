// controllers/sectorController.js
const Sector = require('../models/Sector');

// ✅ Must be named 'getSectors' (plural)
exports.getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find();
    res.status(200).json({
      success: true,
      data: sectors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Must be named 'getSectorById'
exports.getSectorById = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Sector not found'
      });
    }
    res.status(200).json({
      success: true,
      data: sector
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Must be named 'createSector'
exports.createSector = async (req, res) => {
  try {
    const sector = await Sector.create(req.body);
    res.status(201).json({
      success: true,
      data: sector
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Must be named 'updateSector'
exports.updateSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Sector not found'
      });
    }
    res.status(200).json({
      success: true,
      data: sector
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Must be named 'deleteSector'
exports.deleteSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndDelete(req.params.id);
    if (!sector) {
      return res.status(404).json({
        success: false,
        message: 'Sector not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Sector deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};