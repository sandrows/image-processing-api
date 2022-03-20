import supertest from 'supertest';
import app from '../index';

const req = supertest(app).get('/api/image');

describe('Image API', () => {
  fit('should load image given correct params', async () => {
    const res = await req.query({ name: 'imgA', height: 200, width: 200 });
    expect(res.status).toBe(200);
  });

  it('should load original image given only name', async () => {
    const res = await req.query({ name: 'imgA' });
    expect(res.status).toBe(200);
  });

  it('should show not found given non existent image', async () => {
    const res = await req.query({ name: 'imgD', height: 200, width: 200 });
    expect(res.status).toBe(404);
    expect(res.text).toEqual('Image does not exist!');
  });

  it('should show error message given wrong params', async () => {
    const res = await req.query({ name: 'imgA', height: 'abc', width: -20 });
    expect(res.status).toBe(400);
    expect(res.text).toEqual(
      'Image dimensions must be a number greater than zero!'
    );
  });

  it('should show error message missing mandatory params', async () => {
    const res = await req.query({ name: 'imgA', width: 150 });
    expect(res.status).toBe(400);
    expect(res.text).toEqual("Image's height and width must be supplied!");
  });
});
