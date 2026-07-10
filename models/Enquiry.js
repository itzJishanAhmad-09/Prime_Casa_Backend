// models/Enquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    trim: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);