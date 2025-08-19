import Category from '../models/category.js'; // Adjust path as needed
import { isAdmin } from '../controller/userController.js'

// ============= CATEGORY OPERATIONS =============

// Create new category
export async function createCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { category, altCategories } = req.body;
        
        // Check if category already exists
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({ 
                message: "Category already exists",
                error: "Duplicate category name" 
            });
        }

        const newCategory = new Category({ category, altCategories });
        const savedCategory = await newCategory.save();
        
        res.status(201).json({
            message: "Category created successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating category",
            error: error.message
        });
    }
}

// Get all categories
export async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Categories retrieved successfully",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching categories",
            error: error.message
        });
    }
}

// Get single category by ID
export async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.status(200).json({
            message: "Category retrieved successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching category",
            error: error.message
        });
    }
}

// Update category
export async function updateCategory(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({ message: "Unauthorized" });
        console.error("Unauthorized access attempt");
        return 
    }

    try {
        const { id } = req.params;
        const updates = req.body;
        
        const updatedCategory = await Category.findByIdAndUpdate(
            id, 
            updates, 
            { new: true, runValidators: true }
        );
        
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating category",
            error: error.message
        });
    }
}

// Delete category
export async function deleteCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.status(200).json({
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting category",
            error: error.message
        });
    }
}

// ============= ALT CATEGORY OPERATIONS =============

// Add alt category to existing category
export async function addAltCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId } = req.params;
        const { name, brands } = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check for duplicate alt category name
        const existingAltCategory = category.altCategories.find(alt => alt.name === name);
        if (existingAltCategory) {
            return res.status(400).json({ 
                message: "Alt category already exists in this category" 
            });
        }

        category.altCategories.push({ name, brands: brands || [] });
        const savedCategory = await category.save();
        
        res.status(201).json({
            message: "Alt category added successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding alt category",
            error: error.message
        });
    }
}

// Update alt category
export async function updateAltCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId } = req.params;
        const updates = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        // Update alt category fields
        Object.assign(altCategory, updates);
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Alt category updated successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating alt category",
            error: error.message
        });
    }
}

// Delete alt category
export async function deleteAltCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId } = req.params;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.altCategories.id(altCategoryId).remove();
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Alt category deleted successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting alt category",
            error: error.message
        });
    }
}

// ============= BRAND OPERATIONS =============

// Add brand to alt category
export async function addBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId } = req.params;
        const { name, models } = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        // Check for duplicate brand name
        const existingBrand = altCategory.brands.find(brand => brand.name === name);
        if (existingBrand) {
            return res.status(400).json({ 
                message: "Brand already exists in this alt category" 
            });
        }

        altCategory.brands.push({ name, models: models || [] });
        const savedCategory = await category.save();
        
        res.status(201).json({
            message: "Brand added successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding brand",
            error: error.message
        });
    }
}

// Update brand
export async function updateBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId } = req.params;
        const updates = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        Object.assign(brand, updates);
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Brand updated successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating brand",
            error: error.message
        });
    }
}

// Delete brand
export async function deleteBrand(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId } = req.params;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        altCategory.brands.id(brandId).remove();
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Brand deleted successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting brand",
            error: error.message
        });
    }
}

// ============= MODEL OPERATIONS =============

// Add model to brand
export async function addModel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId } = req.params;
        const { name, submodels } = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        // Check for duplicate model name
        const existingModel = brand.models.find(model => model.name === name);
        if (existingModel) {
            return res.status(400).json({ 
                message: "Model already exists in this brand" 
            });
        }

        brand.models.push({ name, submodels: submodels || [] });
        const savedCategory = await category.save();
        
        res.status(201).json({
            message: "Model added successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding model",
            error: error.message
        });
    }
}

// Update model
export async function updateModel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId, modelId } = req.params;
        const updates = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const model = brand.models.id(modelId);
        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }

        Object.assign(model, updates);
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Model updated successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating model",
            error: error.message
        });
    }
}

// Delete model
export async function deleteModel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId, modelId } = req.params;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        brand.models.id(modelId).remove();
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Model deleted successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting model",
            error: error.message
        });
    }
}

// ============= SUBMODEL OPERATIONS =============

// Add submodel to model
export async function addSubmodel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId, modelId } = req.params;
        const { name } = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const model = brand.models.id(modelId);
        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }

        // Check for duplicate submodel name
        const existingSubmodel = model.submodels.find(sub => sub.name === name);
        if (existingSubmodel) {
            return res.status(400).json({ 
                message: "Submodel already exists in this model" 
            });
        }

        model.submodels.push({ name });
        const savedCategory = await category.save();
        
        res.status(201).json({
            message: "Submodel added successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding submodel",
            error: error.message
        });
    }
}

// Update submodel
export async function updateSubmodel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId, modelId, submodelId } = req.params;
        const updates = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const model = brand.models.id(modelId);
        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }

        const submodel = model.submodels.id(submodelId);
        if (!submodel) {
            return res.status(404).json({ message: "Submodel not found" });
        }

        Object.assign(submodel, updates);
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Submodel updated successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating submodel",
            error: error.message
        });
    }
}

// Delete submodel
export async function deleteSubmodel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const { categoryId, altCategoryId, brandId, modelId, submodelId } = req.params;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const model = brand.models.id(modelId);
        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }

        model.submodels.id(submodelId).remove();
        const savedCategory = await category.save();
        
        res.status(200).json({
            message: "Submodel deleted successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting submodel",
            error: error.message
        });
    }
}

// ============= HELPER FUNCTIONS FOR ADVERTISEMENT FORMS =============

// Get alt categories by category ID
export async function getAltCategoriesByCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId).select('altCategories');
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.status(200).json({
            message: "Alt categories retrieved successfully",
            data: category.altCategories
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching alt categories",
            error: error.message
        });
    }
}

// Get brands by alt category
export async function getBrandsByAltCategory(req, res) {
    try {
        const { categoryId, altCategoryId } = req.params;
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }
        
        res.status(200).json({
            message: "Brands retrieved successfully",
            data: altCategory.brands
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching brands",
            error: error.message
        });
    }
}

// Get models by brand
export async function getModelsByBrand(req, res) {
    try {
        const { categoryId, altCategoryId, brandId } = req.params;
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        
        res.status(200).json({
            message: "Models retrieved successfully",
            data: brand.models
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching models",
            error: error.message
        });
    }
}

// Get submodels by model
export async function getSubmodelsByModel(req, res) {
    try {
        const { categoryId, altCategoryId, brandId, modelId } = req.params;
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const altCategory = category.altCategories.id(altCategoryId);
        if (!altCategory) {
            return res.status(404).json({ message: "Alt category not found" });
        }

        const brand = altCategory.brands.id(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const model = brand.models.id(modelId);
        if (!model) {
            return res.status(404).json({ message: "Model not found" });
        }
        
        res.status(200).json({
            message: "Submodels retrieved successfully",
            data: model.submodels
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching submodels",
            error: error.message
        });
    }
}
