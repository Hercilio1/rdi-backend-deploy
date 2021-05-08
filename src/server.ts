import express from 'express';
import routes from './routes';

const PORT = 4000;

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
