import express from 'express';
import * as categoryController from '../controller/categories/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/fetch', categoryController.getCategories);
categoryRouter.put('/update/:id', categoryController.updateCategory);
categoryRouter.delete('/delete/:id', categoryController.deleteCategory);


export default categoryRouter;

