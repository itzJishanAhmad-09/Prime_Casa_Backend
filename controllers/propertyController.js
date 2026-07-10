const Property = require('../models/Property');

// @desc    Get all properties with filters
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const {
      type,
      sector,
      status,
      minPrice,
      maxPrice,
      search,
      isFeatured,
      isPopular,
      limit = 20,
      page = 1,
    } = req.query;

    const query = {};
    
    // Apply filters
    if (type && type !== 'all' && type !== '') query.type = type;
    if (sector && sector !== 'all' && sector !== '') query.sector = sector;
    if (status && status !== 'All' && status !== '') query.status = status;
    if (isFeatured === 'true') query.isFeatured = true;
    if (isPopular === 'true') query.isPopular = true;

    // Price filter
    if (minPrice || maxPrice) {
      query['price.min'] = {};
      if (minPrice) query['price.min'].$gte = Number(minPrice);
      if (maxPrice) query['price.min'].$lte = Number(maxPrice);
    }

    // Text search
    if (search && search.trim()) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort = search ? { score: { $meta: 'textScore' } } : { createdAt: -1 };

    const properties = await Property.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Property not found' 
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    // Get similar properties
    const similar = await Property.find({
      type: property.type,
      sector: property.sector,
      _id: { $ne: property._id },
    })
    .limit(4)
    .select('title builder location price images');

    res.json({
      success: true,
      property,
      similar,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Create property (Admin)
// @route   POST /api/properties
exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Update property (Admin)
// @route   PUT /api/properties/:id
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Property not found' 
      });
    }

    res.json({
      success: true,
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Delete property (Admin)
// @route   DELETE /api/properties/:id
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Property not found' 
      });
    }

    res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
exports.getFeatured = async (req, res) => {
  try {
    const properties = await Property.find({ isFeatured: true })
      .limit(6)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// @desc    Get popular properties
// @route   GET /api/properties/popular
exports.getPopular = async (req, res) => {
  try {
    const properties = await Property.find({ isPopular: true })
      .limit(6)
      .sort({ views: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};