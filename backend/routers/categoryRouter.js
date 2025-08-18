import express from 'express';
import { createCategory, getAllCategories, getAltCategories, getBrands, getCategory, getModels } from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:categoryName', getCategory)
categoryRouter.get('/:categoryId/altCategories', getAltCategories);
categoryRouter.get('/:categoryId/altCategories/:altCategoryName/brands', getBrands);
categoryRouter.get('/:categoryId/altCategories/:altCategoryName/brands/:brandName/models', getModels);


export default categoryRouter;