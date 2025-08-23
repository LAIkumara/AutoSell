import Brand from "../../models/categories/brand.js";
import { isAdmin } from "../userController.js";

export async function createBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }
    const { name, category, subCategory } = req.body;

    if (!name || !category || !subCategory) {
        return res.status(400).json({
            message: "Name, category, and subCategory are required.",
        });
    }

    try {
        const existingBrand = await Brand.findOne({ name , category, subCategory });
        if (existingBrand) {
            return res.status(400).json({
                message: "Brand already exists",
            });
        }
        const newBrand = new Brand({
            name: name.trim(),
            category: category,
            subCategory: subCategory,
            isActive: true,
            advertisementCount: 0,
        });

        await newBrand.save();
        return res.status(201).json({ message: "Brand created successfully", data: newBrand });
    } catch (error) {
        console.error("Error creating brand:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getBrands(req, res) {

    try {
        const { categoryId, subCategoryId } = req.query;

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({ message: 'Category ID and SubCategory ID are required.' });
        }
        if (req.user.role == "customer") {
            const brands = await Brand.find({ category: categoryId, subCategory: subCategoryId, isActive: true })
            .populate('category', 'name')
            .populate('subCategory', 'name');
            res.json({
                message: "Brands fetched successfully",
                brands: brands,
            })
        }

        if (req.user.role == "admin") {
            const brands = await Brand.find({ category: categoryId, subCategory: subCategoryId })
            .populate('category', 'name')
            .populate('subCategory', 'name');
            res.json({
                message: "Brands fetched successfully",
                brands: brands,
            })
        } else {
            return res.status(403).json({ 
                message: 'Access denied.' 
            });
        }
        
    } catch (error) {
        console.error('Error fetching brands:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const { brandId } = req.params;
    const { name, category, subCategory, isActive } = req.body;

    if (!brandId) {
        return res.status(400).json({ message: 'Brand ID is required.' });
    }

    try {
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found.' });
        }

        // Check for duplicate brand name within the same category and subCategory
        if (name && (name == brand.name) && (category == brand.category) && (subCategory == brand.subCategory)) {
            return res.status(400).json({ message: 'Another brand with the same name already exists in this category and subCategory.' });
        }

        // Update fields if provided
        if (name) brand.name = name.trim();
        if (category) brand.category = category;
        if (subCategory) brand.subCategory = subCategory;
        if (isActive !== undefined) brand.isActive = isActive;

        await brand.save();
        return res.json({ message: 'Brand updated successfully', data: brand });
    } catch (error) {
        console.error('Error updating brand:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export async function deleteBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const { brandId } = req.params;

    if (!brandId) {
        return res.status(400).json({ message: 'Brand ID is required.' });
    }

    try {
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found.' });
        }

        await Brand.deleteOne({ _id: brandId });
        return res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

