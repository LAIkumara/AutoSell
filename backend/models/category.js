import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  altCategories: [{
    name: {
      type: String,
      unique: true,
      required: true
    },
    brands: [{
      name: {
        type: String,
        unique: true,
        required: true
      },
      models: [{
        name: {
          type: String,
          required: true,
          unique: true
        },
        submodels: [{
          name: {
            type: String
          }
        }]          
      }]
    }]
  }]
})

const Category = mongoose.model('Category', categorySchema);
export default Category;
