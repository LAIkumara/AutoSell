import Category from "../models/category.js";

export async function createCategory(req, res){

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