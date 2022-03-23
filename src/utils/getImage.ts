import { constants as fsConstants, promises as fsPromises } from 'fs';
import path from 'path';
import settings from '../settings';
import sharp from 'sharp';

export default async function getImage(
  imagename: string,
  width: string,
  height: string
): Promise<string> {
  const filename = imagename + '.jpg';
  const fileorigin = path.join('media', 'originals', filename);
  const filedir = path.join('media', `${width}x${height}`);

  // Serve original
  if (!(height && width)) {
    return path.join(settings.BASE_DIR, fileorigin);
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

  return path.join(settings.BASE_DIR, filedir, filename);
}
