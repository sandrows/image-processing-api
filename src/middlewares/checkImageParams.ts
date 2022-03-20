import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { constants as fsConstants, promises as fsPromises } from 'fs';

const checkImageParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filename = req.query.filename as string | undefined;
  const height = req.query.height as string | undefined;
  const width = req.query.width as string | undefined;

  let msg = '';
  let code = 200;

  if (!filename) {
    code = 400;
    msg = 'Image filename must be supplied!';
  } else {
    try {
      const filepath = path.join('media', 'originals', filename + '.jpg');
      await fsPromises.access(filepath, fsConstants.R_OK);
    } catch (error) {
      code = 404;
      msg = 'Image does not exist!';
    }
  }

  if (height && width) {
    const heightVal = parseInt(height);
    const widthVal = parseInt(width);
    if (!(heightVal && widthVal && heightVal > 0 && widthVal > 0)) {
      code = 400;
      msg = 'Image dimensions must be a number greater than zero!';
    }
  } else if (height || width) {
    code = 400;
    msg = 'Image height and width must be supplied!';
  }

  if (code != 200) return res.status(code).send(msg);
  next();
};

export default checkImageParams;
