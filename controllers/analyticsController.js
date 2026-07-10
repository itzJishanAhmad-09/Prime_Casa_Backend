const Property = require('../models/Property');
const Enquiry = require('../models/Enquiry');
const Domain = require('../models/Domain');
const User = require('../models/User');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalProperties,
      totalEnquiries,
      totalDomains,
      totalUsers,
      recentEnquiries,
      recentProperties
    ] = await Promise.all([
      Property.countDocuments(),
      Enquiry.countDocuments(),
      Domain.countDocuments(),
      User.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
      Property.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProperties,
        totalEnquiries,
        totalDomains,
        totalUsers,
        recentEnquiries,
        recentProperties,
        enquiriesToday: await Enquiry.countDocuments({
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }),
        propertiesToday: await Property.countDocuments({
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

// Get property analytics
exports.getPropertyAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    // Get date range based on period
    const dateRange = getDateRange(period);
    
    const [
      totalProperties,
      propertiesByStatus,
      propertiesByType,
      propertiesByCity,
      averagePrice,
      priceRange,
      recentListings
    ] = await Promise.all([
      Property.countDocuments(),
      Property.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Property.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]),
      Property.aggregate([
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Property.aggregate([
        { $group: { _id: null, avgPrice: { $avg: '$price' } } }
      ]),
      Property.aggregate([
        { $group: { _id: null, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }
      ]),
      Property.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('title price status city createdAt')
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalProperties,
        byStatus: propertiesByStatus,
        byType: propertiesByType,
        byCity: propertiesByCity,
        averagePrice: averagePrice[0]?.avgPrice || 0,
        minPrice: priceRange[0]?.minPrice || 0,
        maxPrice: priceRange[0]?.maxPrice || 0,
        recentListings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching property analytics',
      error: error.message
    });
  }
};

// Get enquiry analytics
exports.getEnquiryAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    const [
      totalEnquiries,
      enquiriesByStatus,
      enquiriesByProperty,
      enquiriesToday,
      enquiriesThisWeek,
      enquiriesThisMonth
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Enquiry.aggregate([
        { $group: { _id: '$property', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Enquiry.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }),
      Enquiry.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
      }),
      Enquiry.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalEnquiries,
        byStatus: enquiriesByStatus,
        byProperty: enquiriesByProperty,
        today: enquiriesToday,
        thisWeek: enquiriesThisWeek,
        thisMonth: enquiriesThisMonth
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry analytics',
      error: error.message
    });
  }
};

// Get domain analytics
exports.getDomainAnalytics = async (req, res) => {
  try {
    const [
      totalDomains,
      availableDomains,
      domainsByCategory,
      domainsByPrice,
      totalValue
    ] = await Promise.all([
      Domain.countDocuments(),
      Domain.countDocuments({ isAvailable: true }),
      Domain.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Domain.aggregate([
        { $group: { _id: null, avgPrice: { $avg: '$price' }, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }
      ]),
      Domain.aggregate([
        { $group: { _id: null, total: { $sum: '$price' } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalDomains,
        available: availableDomains,
        unavailable: totalDomains - availableDomains,
        byCategory: domainsByCategory,
        averagePrice: domainsByPrice[0]?.avgPrice || 0,
        minPrice: domainsByPrice[0]?.minPrice || 0,
        maxPrice: domainsByPrice[0]?.maxPrice || 0,
        totalValue: totalValue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching domain analytics',
      error: error.message
    });
  }
};

// Get user analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    const [
      totalUsers,
      usersToday,
      usersThisWeek,
      usersThisMonth,
      usersByRole
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }),
      User.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
      }),
      User.countDocuments({
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
      }),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalUsers,
        today: usersToday,
        thisWeek: usersThisWeek,
        thisMonth: usersThisMonth,
        byRole: usersByRole
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user analytics',
      error: error.message
    });
  }
};

// Get revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
  try {
    // This is a placeholder - implement based on your payment/order models
    res.status(200).json({
      success: true,
      data: {
        totalRevenue: 0,
        revenueThisMonth: 0,
        revenueThisYear: 0,
        bySource: [],
        byProperty: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue analytics',
      error: error.message
    });
  }
};

// Get traffic analytics
exports.getTrafficAnalytics = async (req, res) => {
  try {
    // This is a placeholder - implement with actual analytics data
    res.status(200).json({
      success: true,
      data: {
        pageViews: 0,
        uniqueVisitors: 0,
        bounceRate: 0,
        popularPages: [],
        trafficSources: []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching traffic analytics',
      error: error.message
    });
  }
};

// Helper function to get date range
function getDateRange(period) {
  const now = new Date();
  let startDate;
  
  switch (period) {
    case 'day':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(now.setDate(now.getDate() - 30));
  }
  
  return startDate;
}