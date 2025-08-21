import mongoose from 'mongoose';
import brand from './brand';

const productModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }, 
  advertisementCount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('ProductModel', productModelSchema);