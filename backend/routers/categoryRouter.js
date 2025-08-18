import express from 'express';
import { createCategory, getCategory } from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/:categoryName', getCategory)


export default categoryRouter;