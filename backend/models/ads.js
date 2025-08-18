import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
  adId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  altCategory: {
    name: String,
    _id: mongoose.Schema.Types.ObjectId
  },
  brand: {
    name: String,
    _id: mongoose.Schema.Types.ObjectId
  },
  model: String,
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  isNegotiable: {
    type: Boolean,
    default: false
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished'],
    default: 'used'
  },
  images: [{
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    altText: {
      type: String,
      trim: true
    }
  }],
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: String
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    whatsapp: String
  },
  author: {
    type: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId},
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'sold', 'expired', 'rejected'],
    default: 'pending'
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  adType: {
    type: String,
    enum: ['free', 'standard', 'premium', 'featured', 'urgent'],
    default: 'free'
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  paymentStatus: {
    type: String,
    enum: ['free', 'pending', 'paid', 'failed'],
    default: 'free'
  },
  expiryDate: {
    type: Date,
    default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from now
  },
  metadata: {
    lastRefreshed: Date,
    bumpCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
advertisementSchema.index({ title: 'text', description: 'text', tags: 'text' });
advertisementSchema.index({ category: 1, status: 1, featured: 1 });
advertisementSchema.index({ author: 1 });
advertisementSchema.index({ status: 1, expiryDate: 1 });

// Virtual for days remaining
advertisementSchema.virtual('daysRemaining').get(function() {
  const days = Math.ceil((this.expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;