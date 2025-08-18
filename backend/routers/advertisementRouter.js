import express from 'express';
import { createAdvertisement } from '../controller/advertisementController.js';



const advertisementRouter = express.Router();

advertisementRouter.post('/', createAdvertisement)

export default advertisementRouter;