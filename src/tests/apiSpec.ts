import supertest from 'supertest';
import app from '../index';
import sharp from 'sharp';

const req = supertest(app);

describe('Image API', () => {
  it('should load image given correct params', async () => {
    const query = { filename: 'imgA', height: '200', width: '200' };
    const res = await req.get('/api/image/').query(query);
    const meta = await sharp(res.body).metadata();
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
    expect(meta.height).toBe(parseInt(query.height));
    expect(meta.width).toBe(parseInt(query.width));
  });

  it('should load original image given only filename', async () => {
    const res = await req.get('/api/image/').query({ filename: 'imgA' });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toEqual('image/jpeg');
  });

  it('should show not found given non existent image', async () => {
    const res = await req
      .get('/api/image/')
      .query({ filename: 'imgD', height: '200', width: '200' });
    expect(res.status).toBe(404);
    expect(res.text).toEqual('Image does not exist!');
  });

  it('should show error message given wrong params', async () => {
    const res = await req
      .get('/api/image/')
      .query({ filename: 'imgA', height: 'abc', width: '-20' });
    expect(res.status).toBe(400);
    expect(res.text).toEqual(
      'Image dimensions must be a number greater than zero!'
    );
  });

  it('should show error message missing one of dimensions', async () => {
    const res = await req
      .get('/api/image/')
      .query({ filename: 'imgA', width: '150' });
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Image height and width must be supplied!');
  });

  it('should show error message missing filename', async () => {
    const res = await req
      .get('/api/image/')
      .query({ height: '100', width: '150' });
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Image filename must be supplied!');
  });
});
