require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const sectorRoutes = require('./routes/sectorRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const blogRoutes = require('./routes/blogRoutes');
const domainRoutes = require('./routes/domainRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ===== DATABASE CONNECTION =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/sectors', sectorRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/domain', domainRoutes);
app.use('/api/analytics', analyticsRoutes);

// ===== HEALTH CHECK =====
app.get('/api/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      mongodb: 'connected'
    });
  } catch (error) {
    res.status(503).json({ status: 'Degraded', mongodb: 'disconnected' });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Prime Casa API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      properties: '/api/properties',
      sectors: '/api/sectors',
      enquiries: '/api/enquiries',
      testimonials: '/api/testimonials',
      blogs: '/api/blogs',
      domain: '/api/domain',
      analytics: '/api/analytics'
    }
  });
});

// ===== ERROR HANDLING =====
app.use(errorHandler);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});