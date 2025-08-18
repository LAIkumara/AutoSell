import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  altCategories: [{
    name: {
      type: String,
      unique: true
    },
    brands: [{
      name: {
        type: String,
        unique: true
      },
      models: [String]
    }]
  }]
});


const Category = mongoose.model('Category', categorySchema);
export default Category;