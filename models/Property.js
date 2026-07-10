const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  builder: {
    type: String,
    required: [true, 'Builder name is required'],
    trim: true,
  },
  sector: {
    type: String,
    required: [true, 'Sector is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  price: {
    min: {
      type: Number,
      required: true,
    },
    max: Number,
    currency: {
      type: String,
      default: 'INR',
    },
    display: String,
  },
  pricePerSqFt: {
    type: Number,
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', 'luxury', 'mixed-use'],
    required: true,
  },
  status: {
    type: String,
    enum: ['New Launch', 'Under Construction', 'Ready to Move'],
    default: 'Under Construction',
  },
  beds: {
    type: String,
  },
  bathrooms: {
    type: Number,
  },
  area: {
    min: Number,
    max: Number,
    unit: {
      type: String,
      default: 'sqft',
    },
  },
  amenities: [String],
  features: [String],
  images: [String],
  reraNumber: String,
  reraVerified: {
    type: Boolean,
    default: true,
  },
  completionDate: Date,
  possessionDate: Date,
  locationCoordinates: {
    lat: Number,
    lng: Number,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  enquiries: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Text search index
propertySchema.index({ 
  title: 'text', 
  location: 'text', 
  sector: 'text',
  builder: 'text',
});

// Indexes for filtering
propertySchema.index({ type: 1, sector: 1, 'price.min': 1 });
propertySchema.index({ isFeatured: 1, isPopular: 1 });

module.exports = mongoose.model('Property', propertySchema);