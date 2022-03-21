## Image Processing API

This API can be used as a placeholder API,
not only to serve images to a frontend, but
also to resize them to the desired size via
width and height parameters.

### Setup

1. Start by installing all necessary packages: `npm install`
2. Optionally, run tests to ensure functionality: `npm run test`
3. Build the app: `npm run build`
4. Start the server: `node .`
5. Open the browser and navigate to the default address:  
   http://localhost:3000/api/image

### Usage

The API accepts only GET requests with the following parameters:
- `filename`: image physical filename without the extension.
- `width`: desired width in pixels.
- `height`: desired height in pixels.

#### Notes:
- `filename` parameter is mandatory.
- `width` and `height` must be **both** included or ignored.
- If the dimensions are ommitted from the request,
then the original file will be served as is.

Image files are included in `/media/originals` directory.
Three test files are included (imgA, imgB, imgC)

### Example

```
GET /api/image?filename=imgA&width=200&height=200
Host: localhost:3000
```