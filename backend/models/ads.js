import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  // Basic Ad Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 2000
  },
  
  category: {
    type: String,
    required: true,
    enum: ['vehicles', 'real_estate', 'jobs', 'services', 'electronics', 'furniture', 'fashion', 'sports']
  },
  subcategory: {
    type: String,
    required: true
  },
  
  attributes: {
    // For Electronics > Mobile Phones
    brand: { type: String }, // Apple, Samsung, etc.
    model: { type: String }, // iPhone 15, Galaxy S24, etc.
    storage: { type: String }, // 64GB, 128GB, etc.
    color: { type: String },
    
    // For Vehicles
    make: { type: String }, // Toyota, Honda, etc.
    vehicleModel: { type: String },
    year: { type: Number },
    mileage: { type: Number },
    fuelType: { type: String },
    transmission: { type: String },
    
    // For Real Estate
    propertyType: { type: String }, // apartment, house, land
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number },
    furnished: { type: String },
    
    // Generic attributes that can be used across categories
    size: { type: String },
    weight: { type: String },
    material: { type: String }
  },
  
  // Pricing
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isNegotiable: {
    type: Boolean,
    default: false
  },
  
  // Media
  images: [{
    url: { type: String, required: true },
    altText: { type: String },
    isPrimary: { type: Boolean, default: false }
  }],
  
  // Location
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    },
    address: { type: String }
  },
  
  // Contact Information
  contact: {
    phone: { type: String },
    email: { type: String },
    whatsapp: { type: String },
    preferredContact: { type: String, enum: ['phone', 'email', 'whatsapp'] }
  },
  
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Ad Management
  status: {
    type: String,
    enum: ['active', 'pending', 'sold', 'expired', 'suspended'],
    default: 'pending'
  },
  condition: {
    type: String,
    enum: ['new', 'like_new', 'good', 'fair', 'poor'],
    default: 'good'
  },
  
  // SEO and Search
  tags: [{ type: String }],
  keywords: [{ type: String }],
  
  // Ad Types and Monetization
  adType: {
    type: String,
    enum: ['free', 'premium', 'featured', 'urgent'],
    default: 'free'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredUntil: { type: Date },
  
  // Payment
  paymentStatus: {
    type: String,
    enum: ['free', 'paid', 'pending', 'failed'],
    default: 'free'
  },
  paymentId: { type: String },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  datePosted: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  }
}, {
  timestamps: true
});

// Indexes for better performance 
adSchema.index({ category: 1, subcategory: 1 });
adSchema.index({ location: 1 });
adSchema.index({ userId: 1 });
adSchema.index({ status: 1, datePosted: -1 });
adSchema.index({ isFeatured: -1, datePosted: -1 });
adSchema.index({ 'attributes.brand': 1, 'attributes.model': 1 });

module.exports = mongoose.model('Ad', adSchema);