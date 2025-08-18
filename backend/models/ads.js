import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    // Additional category details for easier querying
    categoryDetails: {
      category_Id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      altCategory_Name: {
        type: [String],
        default: null
      },
      category_BrandName: {
        type: String,
        default: null
      },
      categoryBrand_ModelName: {
        type: String,
        default: null
      }
    },
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        default: 'USD',
        uppercase: true
      },
      type: {
        type: String,
        enum: ['fixed', 'negotiable', 'auction', 'free'],
        default: 'fixed'
      }
    },
    images: [{
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        default: ''
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    location: {
      city: {
        type: String,
        required: true,
        trim: true
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
      country: {
        type: String,
        required: true,
        trim: true,
        default: 'Sri Lanka'
      },
      coordinates: {
        latitude: {
          type: Number,
          min: -90,
          max: 90
        },
        longitude: {
          type: Number,
          min: -180,
          max: 180
        }
      },
      address: {
        type: String,
        trim: true
      }
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        lowercase: true
      },
      whatsapp: {
        type: String,
        trim: true
      },
      preferredContact: {
        type: String,
        enum: ['phone', 'email', 'whatsapp'],
        default: 'phone'
      }
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'sold', 'expired', 'deleted', 'suspended'],
      default: 'pending'
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    adType: {
      type: String,
      enum: ['free', 'premium', 'featured', 'urgent', 'top'],
      default: 'free'
    },
    analytics: {
      views: {
        type: Number,
        default: 0
      },
      clicks: {
        type: Number,
        default: 0
      },
      favorites: {
        type: Number,
        default: 0
      },
      shares: {
        type: Number,
        default: 0
      }
    },
    isNegotiable: {
      type: Boolean,
      default: true
    },
    condition: {
      type: String,
      enum: ['new', 'used'],
      required: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    paymentStatus: {
      type: String,
      enum: ['free', 'paid', 'pending', 'failed', 'refunded'],
      default: 'free'
    },
    promotionExpiry: {
      type: Date,
      default: null
    },
    priority: {
      type: Number,
      default: 0, // Higher numbers = higher priority in listings
      min: 0,
      max: 100
    },
    // Moderation fields
    moderationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    moderationNotes: {
      type: String,
      default: ''
    },
    // SEO and search optimization
    metaTitle: {
      type: String,
      maxlength: 60
    },
    metaDescription: {
      type: String,
      maxlength: 160
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;