import mongoose from 'mongoose';

const subModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel',
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
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
});

export default mongoose.model('SubModel', subModelSchema);