const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tier: {
    type: String,
    enum: ['premium', 'mid', 'affordable', 'commercial'],
    required: true,
  },
  priceRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR',
    },
  },
  flatRate: String,
  plotRate: String,
  growth: {
    oneYear: Number,
    threeYear: Number,
    fiveYear: Number,
  },
  type: String,
  badge: {
    type: String,
    enum: ['hot', 'up', 'mid'],
    default: 'mid',
  },
  description: String,
  amenities: [String],
  metroConnectivity: String,
  schools: [String],
  hospitals: [String],
  markets: [String],
  image: String,
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sector', sectorSchema);