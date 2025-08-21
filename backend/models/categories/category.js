import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Ensures no leading/trailing spaces
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

export default mongoose.model('Category', categorySchema);