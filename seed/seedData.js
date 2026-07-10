const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Property = require('../models/Property');
const Sector = require('../models/Sector');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear data
    await Promise.all([
      User.deleteMany(),
      Property.deleteMany(),
      Sector.deleteMany(),
      Testimonial.deleteMany(),
      Blog.deleteMany(),
    ]);
    console.log('🗑️ Cleared existing data');

    // === ADMIN ===
    const admin = new User({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@primecasa.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
      isVerified: true,
    });
    await admin.save();
    console.log('👤 Admin user created');

    // === SECTORS ===
    const sectorData = [
      {
        name: 'Sector 150',
        tier: 'premium',
        flatRate: '₹13,000–15,000',
        plotRate: '₹14,000–18,000',
        growth: { oneYear: 24, threeYear: 45, fiveYear: 75 },
        type: 'Ultra-Premium Green',
        badge: 'hot',
        description: 'One of the most premium sectors with excellent green spaces and luxury developments',
        amenities: ['Parks', 'Schools', 'Hospitals', 'Shopping'],
        metroConnectivity: 'Aqua Line (Proposed)',
      },
      {
        name: 'Sector 128',
        tier: 'premium',
        flatRate: '₹11,500–14,000',
        plotRate: '₹13,000–16,000',
        growth: { oneYear: 18, threeYear: 35, fiveYear: 60 },
        type: 'Green Luxury Belt',
        badge: 'hot',
        description: 'Known for luxury projects and excellent connectivity',
        amenities: ['Golf Course', 'International School', 'Hospital'],
        metroConnectivity: 'Aqua Line (Approved)',
      },
      {
        name: 'Sector 94',
        tier: 'premium',
        flatRate: '₹12,000–14,500',
        plotRate: '₹13,500–17,000',
        growth: { oneYear: 20, threeYear: 40, fiveYear: 65 },
        type: 'Expressway Premium',
        badge: 'hot',
        description: 'Prime location with excellent connectivity',
        amenities: ['Corporate Hubs', 'Retail', 'Healthcare'],
        metroConnectivity: 'Blue Line',
      },
      {
        name: 'Noida Extension',
        tier: 'affordable',
        flatRate: '₹7,950–9,500',
        plotRate: '₹6,000–8,500',
        growth: { oneYear: 24, threeYear: 55, fiveYear: 98 },
        type: 'Fastest Growing',
        badge: 'hot',
        description: 'Most affordable sector with highest appreciation potential',
        amenities: ['Schools', 'Hospitals', 'Markets'],
        metroConnectivity: 'Metro (Planned)',
      },
      {
        name: 'Greater Noida West',
        tier: 'affordable',
        flatRate: '₹6,600–8,450',
        plotRate: '₹5,500–7,500',
        growth: { oneYear: 24, threeYear: 55, fiveYear: 98 },
        type: '5-yr Appreciation Star',
        badge: 'hot',
        description: 'Highest appreciation in the region with excellent infrastructure',
        amenities: ['Schools', 'Hospitals', 'Shopping Malls'],
        metroConnectivity: 'Metro (Proposed)',
      },
      {
        name: 'Sector 62',
        tier: 'mid',
        flatRate: '₹10,000–13,000',
        plotRate: '₹11,000–15,000',
        growth: { oneYear: 16, threeYear: 30, fiveYear: 50 },
        type: 'IT & Residential',
        badge: 'up',
        description: 'Popular among IT professionals with good connectivity',
        amenities: ['IT Parks', 'Schools', 'Healthcare'],
        metroConnectivity: 'Blue Line',
      },
    ];

    const sectors = await Sector.insertMany(sectorData);
    console.log(`🏘️ ${sectors.length} sectors created`);

    // === PROPERTIES ===
    const propertyData = [
      {
        title: 'Eldeco Whispers of Wonder',
        builder: 'Eldeco',
        sector: 'Sector 150',
        location: 'Yamuna Expressway',
        price: { min: 15500000, max: 31000000, display: '₹1.55 Cr – 3.10 Cr' },
        pricePerSqFt: 10000,
        type: 'residential',
        status: 'Under Construction',
        beds: '2–4 BHK',
        amenities: ['Pool', 'Gym', 'Club', 'Kids Zone'],
        reraNumber: 'RERA-2026-001',
        reraVerified: true,
        isPopular: true,
        isFeatured: true,
        features: ['Premium Location', 'RERA Approved', 'Quality Construction'],
      },
      {
        title: 'Max Estate 128',
        builder: 'Max Estates',
        sector: 'Sector 128',
        location: 'Sector 128, Noida',
        price: { min: 25000000, display: '₹2.5 Cr Onwards' },
        pricePerSqFt: 24998,
        type: 'luxury',
        status: 'Under Construction',
        beds: '3–4 BHK',
        amenities: ['Sky Deck', 'Spa', 'Golf', 'Clubhouse'],
        reraNumber: 'RERA-2026-002',
        reraVerified: true,
        isFeatured: true,
        isPopular: true,
        features: ['Luxury Living', 'Green Belt', 'Premium Amenities'],
      },
      {
        title: 'M3M The Line',
        builder: 'M3M',
        sector: 'Sector 94',
        location: 'Sector 72, Noida',
        price: { min: 18000000, display: '₹1.8 Cr Onwards' },
        pricePerSqFt: 14500,
        type: 'commercial',
        status: 'New Launch',
        beds: 'Retail · Suites',
        amenities: ['Boulevard', 'Fine Dining', 'Retail'],
        reraNumber: 'RERA-2026-003',
        reraVerified: true,
        isFeatured: true,
        features: ['Commercial Hub', 'High Street Retail'],
      },
      {
        title: 'Smart World Sec 98',
        builder: 'Smart World',
        sector: 'Noida Extension',
        location: 'Sector 98, Noida',
        price: { min: 14000000, display: '₹1.4 Cr Onwards' },
        pricePerSqFt: 11500,
        type: 'residential',
        status: 'New Launch',
        beds: '2–3 BHK',
        amenities: ['Pool', 'Gym', 'Metro Access'],
        reraNumber: 'RERA-2026-004',
        reraVerified: true,
        isPopular: true,
        features: ['Metro Connectivity', 'Smart Home Features'],
      },
      {
        title: 'Gaur Yamuna City',
        builder: 'Gaursons',
        sector: 'Greater Noida West',
        location: 'Yamuna Expressway Sec 22D',
        price: { min: 9000000, display: '₹90 L Onwards' },
        pricePerSqFt: 7500,
        type: 'commercial',
        status: 'New Launch',
        beds: 'Retail · Office',
        amenities: ['High Street', 'Food Court'],
        reraNumber: 'RERA-2026-005',
        reraVerified: true,
        features: ['Affordable Commercial', 'High Footfall Area'],
      },
      {
        title: 'L&T Green Reserve',
        builder: 'L&T Realty',
        sector: 'Sector 128',
        location: 'Sector 128, Noida',
        price: { min: 32000000, display: '₹3.2 Cr Onwards' },
        pricePerSqFt: 22000,
        type: 'luxury',
        status: 'Under Construction',
        beds: '3–4 BHK',
        amenities: ['Eco', 'Clubhouse', 'Wellness', 'Spa'],
        reraNumber: 'RERA-2026-006',
        reraVerified: true,
        isFeatured: true,
        features: ['Eco-Friendly', 'Luxury Living', 'Green Spaces'],
      },
    ];

    const properties = await Property.insertMany(propertyData);
    console.log(`🏠 ${properties.length} properties created`);

    // === TESTIMONIALS (using 'content' field) ===
    const testimonialData = [
      {
        name: 'Ananya Sharma',
        role: 'Homebuyer, Sector 150',
        content: 'The Prime Casa made my first home purchase seamless. Their RERA verification and zero-brokerage policy gave me complete confidence.',
        stars: 5,
        isActive: true,
      },
      {
        name: 'Rajesh Kumar',
        role: 'NRI Investor',
        content: 'I live abroad but they handled everything – from property selection to legal paperwork. Highly professional team!',
        stars: 5,
        isActive: true,
      },
      {
        name: 'Priya Malhotra',
        role: 'First-time Investor',
        content: 'Their ROI calculator and market insights helped me choose the right sector. I\'ve already seen a 12% appreciation in 6 months.',
        stars: 5,
        isActive: true,
      },
      {
        name: 'Vikram Singh',
        role: 'Property Developer',
        content: 'Prime Casa has been instrumental in connecting us with genuine buyers. Their platform is reliable and professional.',
        stars: 4,
        isActive: true,
      },
    ];

    await Testimonial.insertMany(testimonialData);
    console.log('⭐ Testimonials created');

    // === BLOGS ===
    const blogData = [
      {
        title: 'Noida International Airport Phase-I: ₹11,282 Cr Hub Inaugurated',
        slug: 'noida-international-airport-phase-1',
        excerpt: 'Phase I of Noida International Airport at Jewar opened with a cargo terminal, boosting the entire Yamuna Expressway corridor values.',
        content: 'Full content about the airport inauguration and its impact on real estate...',
        tag: 'Infrastructure',
        emoji: '✈️',
        date: new Date('2026-03-01'),
        category: ['Infrastructure', 'Noida'],
        author: 'Prime Casa Team',
        isPublished: true,
        readTime: 3,
      },
      {
        title: 'UP-RERA Amendments 2026: Relief for Buyers of Unregistered Projects',
        slug: 'up-rera-amendments-2026',
        excerpt: 'UP-RERA lets buyers of unregistered projects file complaints, caps transfer fees, and strengthens buyer protections across UP.',
        content: 'Detailed analysis of the new RERA amendments and their impact on buyers...',
        tag: 'Policy',
        emoji: '⚖️',
        date: new Date('2026-03-15'),
        category: ['Policy', 'Legal'],
        author: 'Legal Team',
        isPublished: true,
        readTime: 4,
      },
      {
        title: 'DMart Opens 50,000+ sq ft Store in Greater Noida',
        slug: 'dmart-opens-greater-noida-store',
        excerpt: 'DMart opens its first Greater Noida store — over 50,000 sq ft at Omaxe Connaught Place, boosting retail real estate demand.',
        content: 'Analysis of retail real estate growth in Greater Noida...',
        tag: 'Retail',
        emoji: '🛒',
        date: new Date('2026-04-01'),
        category: ['Retail', 'Greater Noida'],
        author: 'Market Research Team',
        isPublished: true,
        readTime: 3,
      },
      {
        title: 'Aqua Metro Extension Approved — Connectivity Boost for Noida Sectors',
        slug: 'aqua-metro-extension-approved',
        excerpt: 'Metro Aqua Line extension approved to connect with Delhi Metro Blue and Magenta lines, dramatically cutting commute times.',
        content: 'Details of the metro extension and its impact on property prices...',
        tag: 'Infrastructure',
        emoji: '🚇',
        date: new Date('2026-02-15'),
        category: ['Infrastructure', 'Metro'],
        author: 'Infrastructure Desk',
        isPublished: true,
        readTime: 4,
      },
      {
        title: 'Mahagun Group Raises ₹225 Crore to Fast-Track Noida Projects',
        slug: 'mahagun-group-raises-225-crore',
        excerpt: 'Mahagun Group secures funding from CSL Finance to speed construction and ensure timely delivery of key Noida residential projects.',
        content: 'Funding details and project timelines...',
        tag: 'Investment',
        emoji: '🏗️',
        date: new Date('2026-04-10'),
        category: ['Investment', 'Noida'],
        author: 'Finance Desk',
        isPublished: true,
        readTime: 3,
      },
    ];

    await Blog.insertMany(blogData);
    console.log(`📝 ${blogData.length} blogs created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`  - ${await User.countDocuments()} users`);
    console.log(`  - ${await Property.countDocuments()} properties`);
    console.log(`  - ${await Sector.countDocuments()} sectors`);
    console.log(`  - ${await Testimonial.countDocuments()} testimonials`);
    console.log(`  - ${await Blog.countDocuments()} blogs`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();