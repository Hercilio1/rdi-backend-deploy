import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';

import swaggerFile from './swagger_output.json';

const PORT = 4000;
const app = express();

const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,POST',
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Listening ${PORT}`);
});
