import express from 'express';
import checkImageParams from '../middlewares/checkImageParams';
import image from './api/image';

const routes = express.Router();

routes.use('/image', checkImageParams, image);

export default routes;
