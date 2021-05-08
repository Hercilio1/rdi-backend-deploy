import express from 'express';
import { addFundInfo, fundUpdate, getFunds } from '../controllers/fund';
import authentication from '../middleware/authentication';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello world');
});

routes.get('/pesquisa', async (req, res) => {
  try {
    const param = req.query;
    const fundos = await getFunds(
      param?.s as string,
      (param?.skip as unknown) as string
    );
    res.status(200).send(fundos);
  } catch (e) {
    res.status(400).send({
      error: 'Failed to get funds from database',
    });
  }
});

routes.use(authentication);

routes.post('/fundo', (req, res) => {
  try {
    addFundInfo(req.body);
    res.status(200).send();
  } catch (e) {
    res.status(400).send({
      error: 'Failed to add entities to database',
    });
  }
});

routes.post('/update', (req, res) => {
  try {
    fundUpdate(req.body);
    res.status(200).send();
  } catch (e) {
    res.status(400).send({
      error: 'Failed to add entities to database',
    });
  }
});

export default routes;
