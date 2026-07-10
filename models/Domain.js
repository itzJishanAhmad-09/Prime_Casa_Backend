const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a domain name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
    enum: ['real-estate', 'technology', 'healthcare', 'education', 'finance', 'retail', 'hospitality', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  registrar: {
    type: String,
    trim: true
  },
  features: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on save
domainSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Domain', domainSchema);