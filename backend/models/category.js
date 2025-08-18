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


// categorySchema.index(
//   { 'altCategories.name': 1 }, 
//   { unique: true, partialFilterExpression: { 'altCategories.name': { $exists: true } } }
// );

// categorySchema.index(
//   { 'altCategories.brands.name': 1 }, 
//   { unique: true, partialFilterExpression: { 'altCategories.brands.name': { $exists: true } } }
// );

const Category = mongoose.model('Category', categorySchema);
export default Category;