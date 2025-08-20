import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true},
  altCategories: [{ 
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, unique: true, required: true},
    brands: [{ 
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      name: { type: String, unique: true, required: true },
      models: [{ 
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true, unique: true },
        submodels: [{ 
          _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
          name: { type: String }
        }]          
      }]
    }]
  }],       
})

const Category = mongoose.model('Category', categorySchema);
export default Category;
