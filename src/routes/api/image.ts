import express from 'express';
import settings from '../../settings';
import path from 'path';
import { constants as fsConstants, promises as fsPromises } from 'fs';
import sharp from 'sharp';

const image = express.Router();

image.get('/', async (req, res) => {
  const filename = (req.query.filename as string) + '.jpg';
  const fileorigin = path.join('media', 'originals', filename);
  const height = req.query.height as string | undefined;
  const width = req.query.width as string | undefined;
  const filedir = path.join('media', `${width}x${height}`);

  // Serve original
  if (!(height && width)) {
    return res.sendFile(path.join(settings.BASE_DIR, fileorigin));
  }

  // Create new dir by dimensions if needed
  try {
    await fsPromises.access(filedir, fsConstants.W_OK);
  } catch (error) {
    await fsPromises.mkdir(filedir);
  }

  // Resize file if needed
  try {
    await fsPromises.access(path.join(filedir, filename), fsConstants.R_OK);
  } catch (error) {
    await sharp(fileorigin)
      .resize(parseInt(width), parseInt(height), { fit: 'contain' })
      .toFile(path.join(filedir, filename));
  }

  res.sendFile(path.join(settings.BASE_DIR, filedir, filename));
});

export default image;
