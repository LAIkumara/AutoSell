import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
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
  isActive: {
    type: Boolean,
    default: true
  },
  advertisementCount: {
    type: Number,
    default: 0
    }
})

export default mongoose.model('Brand', brandSchema);