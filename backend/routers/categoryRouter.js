// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controller/categoryController.js';

const router = express.Router();

// Category routes
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Alt Category routes
router.post('/:categoryId/altCategories', categoryController.addAltCategory);
router.put('/:categoryId/altCategories/:altCategoryId', categoryController.updateAltCategory);
router.delete('/:categoryId/altCategories/:altCategoryId', categoryController.deleteAltCategory);

// Brand routes
router.post('/:categoryId/altCategories/:altCategoryId/brands', categoryController.addBrand);
router.put('/:categoryId/altCategories/:altCategoryId/brands/:brandId', categoryController.updateBrand);
router.delete('/:categoryId/altCategories/:altCategoryId/brands/:brandId', categoryController.deleteBrand);

// Model routes
router.post('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models', categoryController.addModel);
router.put('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId', categoryController.updateModel);
router.delete('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId', categoryController.deleteModel);

// Submodel routes
router.post('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId/submodels', categoryController.addSubmodel);
router.put('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId/submodels/:submodelId', categoryController.updateSubmodel);
router.delete('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId/submodels/:submodelId', categoryController.deleteSubmodel);

// Helper routes for advertisement forms
router.get('/:categoryId/altCategories', categoryController.getAltCategoriesByCategory);
router.get('/:categoryId/altCategories/:altCategoryId/brands', categoryController.getBrandsByAltCategory);
router.get('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models', categoryController.getModelsByBrand);
router.get('/:categoryId/altCategories/:altCategoryId/brands/:brandId/models/:modelId/submodels', categoryController.getSubmodelsByModel);

export default router;
