import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    categoryID: {
        type: String,
        unique: true,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    categoryAltNames: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
    note: {
        type: String,
        default: 'No additional notes',
    },
})

const Category = mongoose.model('Category', categorySchema);
export default Category;