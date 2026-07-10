// controllers/enquiryController.js
const Enquiry = require('../models/Enquiry');

// Get all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiries',
      error: error.message
    });
  }
};

// Get single enquiry by ID
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry',
      error: error.message
    });
  }
};

// Create new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating enquiry',
      error: error.message
    });
  }
};

// Update enquiry
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating enquiry',
      error: error.message
    });
  }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting enquiry',
      error: error.message
    });
  }
};

// Update enquiry status (e.g., for marking as read/processed)
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating enquiry status',
      error: error.message
    });
  }
};