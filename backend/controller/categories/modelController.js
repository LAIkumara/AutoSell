import { isAdmin } from "../userController.js";
import Model from "../../models/categories/models.js";

// Create models
export async function createModel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const { name, category, subCategory, brand, subModels, isActive } = req.body;

    // Validation: Check if required fields are present
    if (!name || !category || !subCategory || !brand) {
        return res.status(400).json({
            message: "Name, category, subCategory, and brand are required.",
        });
    }

    try {
        // Check if model with the same name, category, subCategory, and brand already exists
        const existingModel = await Model.findOne({ name: name.trim(), category, subCategory, brand });
        if (existingModel) {
            // Allow adding sub-models to an existing model
            const subModelNames = existingModel.subModels.map(sm => sm.name.trim().toLowerCase());
            const newSubModels = subModels.map(sm => sm.name.trim().toLowerCase());
            const duplicateSubModels = newSubModels.filter(name => subModelNames.includes(name));

            if (duplicateSubModels.length > 0) {
                return res.status(400).json({
                    message: `Sub-model(s) with name(s) ${duplicateSubModels.join(', ')} already exist.`,
                });
            }

            // Add new unique sub-models to the existing model
            const updatedModel = await Model.findByIdAndUpdate(
                existingModel._id,
                {
                    $push: {
                        subModels: subModels.map(sm => ({
                            name: sm.name.trim(),
                            isActive: sm.isActive !== undefined ? sm.isActive : true,
                            advertisementCount: 0
                        }))
                    }
                },
                { new: true }
            );

            return res.status(200).json({
                message: "Sub-model(s) added successfully to the existing model.",
                model: updatedModel,
            });
        }

        // Check if sub-models have unique names before adding
        if (subModels && subModels.length > 0) {
            const subModelNames = subModels.map(sm => sm.name.trim().toLowerCase());
            const uniqueSubModelNames = new Set(subModelNames);
            if (subModelNames.length !== uniqueSubModelNames.size) {
                return res.status(400).json({
                    message: "Sub-model names must be unique",
                });
            }
        }

        // Create the new model instance
        const newModel = new Model({
            name: name.trim(),
            category,
            subCategory,
            brand,
            subModels: subModels ? subModels.map(sm => ({
                name: sm.name.trim(),
                isActive: sm.isActive !== undefined ? sm.isActive : true,
                advertisementCount: 0
            })) : [],
            isActive: isActive !== undefined ? isActive : true,  // Default to true if not provided
            advertisementCount: 0,
        });

        // Save the new model to the database
        await newModel.save();

        return res.status(201).json({
            message: "Model created successfully",
            model: newModel
        });

    } catch (error) {
        console.error("Error creating model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// Get all models
export async function getModels(req, res) {

    try {
        const { categoryId, subCategoryId, brandId } = req.query;

        if(!categoryId || !subCategoryId || !brandId) {
            return res.status(400).json({ message: 'Category ID, SubCategory ID, and Brand ID are required.' });
        }
        if (req.user.role === "customer") {
            const models = await Model.find({
                category: categoryId,
                subCategory: subCategoryId,
                brand: brandId,
                isActive: true
            })
            .populate('category', 'name')
            .populate('subCategory', 'name')
            .populate('brand', 'name')
            .populate('subModels', 'name');
            return res.json({
                message: "Models fetched successfully",
                models: models,
            });
        }

        if (req.user.role === "admin") {
            const models = await Model.find({
                category: categoryId,
                subCategory: subCategoryId,
                brand: brandId
            })
            .populate('category', 'name')
            .populate('subCategory', 'name')
            .populate('brand', 'name')
            .populate('subModels', 'name');
            return res.json({
                message: "Models fetched successfully",
                models: models,
            });
        } else {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

    } catch (error) {
        console.error("Error fetching models:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

//update model and sub-models
export async function updateModel(req, res) {
    if(!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }
    const { modelId } = req.params;
    const { name, category, subCategory, brand, subModels, isActive } = req.body;
    if (!modelId) {
        return res.status(400).json({ message: 'Model ID is required.' });
    }
    try {
        const model = await Model.findById(modelId);
        if (!model) {
            return res.status(404).json({ message: 'Model not found.' });
        }
        const updatedData = {
            name: name ? name.trim() : model.name,
            category: category || model.category,
            subCategory: subCategory || model.subCategory,
            brand: brand || model.brand,
            isActive: isActive !== undefined ? isActive : model.isActive,
        };
        if (subModels && subModels.length > 0) {
            const subModelNames = subModels.map(sm => sm.name.trim().toLowerCase());
            const uniqueSubModelNames = new Set(subModelNames);
            if (subModelNames.length !== uniqueSubModelNames.size) {
                return res.status(400).json({
                    message: "Sub-model names must be unique",
                });
            }
            updatedData.subModels = subModels.map(sm => ({
                name: sm.name.trim(),
                isActive: sm.isActive !== undefined ? sm.isActive : true,
                advertisementCount: 0
            }));
        }
        const updatedModel = await Model.findByIdAndUpdate(modelId, updatedData, { new: true });
        return res.status(200).json({
            message: "Model updated successfully",
            model: updatedModel,
        });
    } catch (error) {
        console.error('Error updating model:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete model and sub-models

export async function deleteModel(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    const { modelId } = req.params;

    if (!modelId) {
        return res.status(400).json({ message: 'Model ID is required.' });
    }

    try {
        const model = await Model.findById(modelId);
        if (!model) {
            return res.status(404).json({ message: 'Model not found.' });
        }

        await Model.findByIdAndDelete(modelId);
        return res.status(200).json({ message: 'Model deleted successfully.' });
    } catch (error) {
        console.error('Error deleting model:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}