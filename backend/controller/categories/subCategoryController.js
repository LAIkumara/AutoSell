// import Category from "../../models/categories/category.js";
import SubCategory from "../../models/categories/SubCategory.js";
import { isAdmin } from "../userController.js";

export async function createSubCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    try {
        const { name, category, isActive } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: 'SubCategory and Category are required.' });
        }

        // Check if the category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'Category does not exist.' });
        }

        // Check if the subcategory already exists
        const existingSubCategory = await SubCategory.findOne({ name, category });
        if (existingSubCategory) {
            return res.status(400).json({ message: 'SubCategory with this name already exists in the specified category.' });
        }

        const newSubCategory = new SubCategory({
            name: name.trim(),
            category: category,
            isActive: isActive !== undefined ? isActive : true,
            advertisementCount: 0, // Default value
        });

        await newSubCategory.save();
        return res.status(201).json({ message: 'SubCategory created successfully', data: newSubCategory });
    } catch (error) {
        console.error('Error creating subcategory:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getSubCategories(req, res) {
    try {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required.' });
        }

        if (req.user.role == "customer") {
            const subCategories = await SubCategory.find({ category: categoryId, isActive: true })
            res.json({
                message: "SubCategories fetched successfully",
                subCategories: subCategories,
            });
        }
        else if (req.user.role == "admin") {
            const subCategories = await SubCategory.find({ category: categoryId })
            res.json({
                message: "SubCategories fetched successfully",
                subCategories: subCategories,
            });
        }
        else {
            return res.status(403).json({
                message: "Access denied."
            });
        }
        
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//update subcategory
export async function updateSubCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const data = req.body;
    const subCategoryId = req.params.subcategoryId;
    
    try {
        await SubCategory.updateOne(
            {
                _id: subCategoryId,
            },
            data
        );
        res.json({
            message: "SubCategory updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating subcategory",
            error: error.message,
        });
        console.error("Error updating subcategory:", error);
        return;
    }
}

// Delete subcategory
export async function deleteSubCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  const subcategoryId = req.params.subcategoryId;

  try {
    const subCategory = await SubCategory.findById(subcategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found.' });
    }
    await SubCategory.deleteOne({ _id: subcategoryId });
    return res.status(200).json({ message: 'SubCategory deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting subcategory:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
    
