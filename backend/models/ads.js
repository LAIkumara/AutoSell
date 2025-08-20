import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
    adId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String},
    
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    altCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category.altCategories', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Category.altCategories.brands', required: true },
    model: { type: mongoose.Schema.Types.ObjectId, ref: 'Category.altCategories.brands.models', required: true },
    submodel: { type: mongoose.Schema.Types.ObjectId, ref: 'Category.altCategories.brands.models.submodels' },
    
    year: { type: Number, required: true },
    images: [{ url: String, altText: String }],
    condition: { type: String, required: true },
    location: { city: String, state: String },
    contactInfo: { phone: String, email: String, whatsapp: String },
    price: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    tags: [String],
    adType: { type: String, default: 'standard' },
    status: { type: String, default: 'pending' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Advertisement', advertisementSchema);
