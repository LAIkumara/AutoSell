import express from 'express';
import { createCategory } from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);


export default categoryRouter;