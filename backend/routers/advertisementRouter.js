import express from 'express';
import { createAdvertisement, getAdvertisements } from '../controller/advertisementController.js';



const advertisementRouter = express.Router();

advertisementRouter.post('/', createAdvertisement)
advertisementRouter.get('/', getAdvertisements)

export default advertisementRouter;