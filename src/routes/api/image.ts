import express from 'express';

const image = express.Router();

image.get('/', (req, res) => {
  res.send('It works');
});

export default image;
