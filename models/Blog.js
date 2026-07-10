const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: String,
  emoji: String,
  date: Date,
  image: String,
  author: {
    type: String,
    default: 'Prime Casa Team',
  },
  category: [String],   // <-- changed from String to [String]
  readTime: Number,
  isPublished: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [{
    name: String,
    email: String,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);