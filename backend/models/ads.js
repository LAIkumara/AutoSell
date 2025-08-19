import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
    adId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    altCategory: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    submodel: { type: String },
    price: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    images: [{ url: String, altText: String }],
    condition: { type: String, required: true },
    location: { city: String, state: String },
    contactInfo: { phone: String, email: String, whatsapp: String },
    tags: [String],
    adType: { type: String, default: 'standard' },
    status: { type: String, default: 'pending' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Advertisement', advertisementSchema);
