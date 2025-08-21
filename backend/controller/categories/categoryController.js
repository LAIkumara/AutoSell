import Category from "../../models/categories/category.js";
import { isAdmin } from "../userController.js";

export async function createCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }
  try {
    const category = new Category(req.body);
    // Validate category name uniqueness
    const existingCategory = await Category.findOne({ name: category.name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists.",
      });
    }
    const response = await category.save();
    res.json({
      message: "Category created successfully",
      category: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
      error: error.message,
    });
  }
}

export async function getCategories(req, res) {
  try {
    if (req.user.role === "customer") {
      const categories = await Category.find({ isActive: true });
      res.json({
        message: "Categories fetched successfully",
        categories: categories,
      });
    } else if (req.user.role === "admin") {
      const categories = await Category.find();
      res.json({
        message: "Categories fetched successfully",
        categories: categories,
      });
    } else {
      res.status(403).json({
        message:
          "Access denied. Only customers and admins can fetch categories.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
}

export async function updateCategory(req, res) {
  if (!isAdmin(req)) {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  const data = req.body;
  const categoryId = req.params.categoryId;

  try {
    await Category.updateOne(
      {
        _id: categoryId,
      },
      data
    );
    res.json({
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
      error: error.message,
    });
    console.error("Error updating category:", error);
    return;
  }
}


export async function deleteCategory(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const categoryId = req.params.categoryId;
    try {
        await Category.deleteOne({
            _id: categoryId
        })
        res.json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting category",
            error: error.message
        });
        console.error("Error deleting category:", error);
    }
}