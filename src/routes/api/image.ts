import express from 'express';
import settings from '../../settings';
import path from 'path';

const image = express.Router();

image.get('/', (req, res) => {
  const filename = req.query.filename as string;
  const filepath = path.join(
    settings.BASE_DIR,
    'media',
    'originals',
    filename + '.jpg'
  );

  res.sendFile(filepath);
});

export default image;
