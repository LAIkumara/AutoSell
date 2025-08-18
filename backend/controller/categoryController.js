import Category from "../models/category.js";
import { isAdmin } from "./userController.js";

export async function createCategory(req, res){

    if(!isAdmin(req)){
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        res.status(201).json(
            savedCategory,{
                message : "Category created successfully",
                process : savedCategory
            }
            
        );
    }catch (error) {
        res.status(500).json({
            message: "Error creating category",
            error: error.message
        });
    }
}

export async function getCategory(req, res) {
    try{
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName: categoryName });
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.json(category)

    }catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

// Get all categories
export async function getAllCategories(req, res) {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


// Get altCategories for a category
export async function getAltCategories(req, res) {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category.altCategories);
    } catch (error) {
        console.error('Error fetching altCategories:', error);
        res.status(500).json({ error: error.message });
    }
}

// Get brands for an altCategory
export async function getBrands(req, res) {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        const altCategory = category.altCategories.find(
            alt => alt.name === req.params.altCategoryName
        );
        
        if (!altCategory) {
            return res.status(404).json({ message: "AltCategory not found" });
        }
        
        res.json(altCategory.brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get models for a brand
export async function getModels(req, res) {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        const altCategory = category.altCategories.find(
            alt => alt.name === req.params.altCategoryName
        );
        
        if (!altCategory) {
            return res.status(404).json({ message: "AltCategory not found" });
        }
        
        const brand = altCategory.brands.find(
            b => b.name === req.params.brandName
        );
        
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        
        res.json(brand.models);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
