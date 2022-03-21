import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use('/api', routes);
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server started on http://localhost:${port}`);
  console.log('CTRL+C to stop.');
  /* eslint-enable no-console */
});

export default app;
