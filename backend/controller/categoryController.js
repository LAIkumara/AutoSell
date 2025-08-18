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
