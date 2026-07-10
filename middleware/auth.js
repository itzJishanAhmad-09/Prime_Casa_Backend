const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token' 
      });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ 
        success: false,
        error: 'Admin access required' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};