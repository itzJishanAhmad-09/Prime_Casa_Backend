const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const blogController = require('../controllers/blogController');

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Admin routes
router.post('/', auth, isAdmin, blogController.createBlog);
router.put('/:id', auth, isAdmin, blogController.updateBlog);
router.delete('/:id', auth, isAdmin, blogController.deleteBlog);

module.exports = router;