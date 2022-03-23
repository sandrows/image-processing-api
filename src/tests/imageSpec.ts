import sharp from 'sharp';
import getImage from '../utils/getImage';

describe('Sharp resizing', () => {
  it('should resize or get image', async () => {
    const query = { filename: 'imgB', width: '200', height: '200' };
    const filepath = await getImage(query.filename, query.width, query.height);
    const meta = await sharp(filepath).metadata();
    expect(meta.height).toBe(parseInt(query.height));
    expect(meta.width).toBe(parseInt(query.width));
  });
});
