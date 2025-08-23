import express from 'express';
import * as categoryController from '../controller/categories/categoryController.js';
import * as subCategoryController from '../controller/categories/subCategoryController.js';
import * as brandController from '../controller/categories/brandController.js';
import * as modelController from '../controller/categories/modelController.js';

const categoryRouter = express.Router();

categoryRouter.post('/createCategory', categoryController.createCategory);
categoryRouter.get('/fetchCategory', categoryController.getCategories);
categoryRouter.put('/updateCategory/:categoryId', categoryController.updateCategory);
categoryRouter.delete('/deleteCategory/:categoryId', categoryController.deleteCategory);

categoryRouter.post('/createSubcategory', subCategoryController.createSubCategory);
categoryRouter.get('/fetchSubcategories', subCategoryController.getSubCategories);
categoryRouter.put('/updateSubcategory/:subcategoryId', subCategoryController.updateSubCategory);
categoryRouter.delete('/deleteSubcategory/:subcategoryId', subCategoryController.deleteSubCategory);

categoryRouter.post('/createBrand', brandController.createBrand);
categoryRouter.get('/fetchBrands', brandController.getBrands);
categoryRouter.put('/updateBrand/:brandId', brandController.updateBrand);
categoryRouter.delete('/deleteBrand/:brandId', brandController.deleteBrand);

categoryRouter.post('/createModel', modelController.createModel);
categoryRouter.get('/fetchModels', modelController.getModels);
categoryRouter.put('/updateModel/:modelId', modelController.updateModel);
categoryRouter.delete('/deleteModel/:modelId', modelController.deleteModel);

export default categoryRouter;

