import express from 'express';
import { Request, Response } from 'express';
import getImage from '../../utils/getImage';

const image = express.Router();

image.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  res.sendFile(await getImage(filename, width, height));
});

export default image;
