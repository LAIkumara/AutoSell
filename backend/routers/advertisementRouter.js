import express from 'express';
import { createAdvertisement, getAdvertisementById, getAdvertisements } from '../controller/advertisementController.js';



const advertisementRouter = express.Router();

advertisementRouter.post('/', createAdvertisement)
advertisementRouter.get('/', getAdvertisements)
advertisementRouter.get('/:userID', getAdvertisementById);

export default advertisementRouter;