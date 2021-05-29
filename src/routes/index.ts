import express, { Request, Response } from 'express';
import {
  addFundInfo,
  fundUpdate,
  getChart,
  getFundDetails,
  getFunds,
} from '../controllers/fund';
import authentication from '../middleware/authentication';

const routes = express.Router();

// Funcao inicial da aplicacao, somente testa se aplicacao ativa
routes.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

// Pesquisa por fundos no banco de dados, a partir de uma query param
routes.get('/pesquisa', async (req: Request, res: Response) => {
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

// Retorna o primeiro fundo encontrado a partir de um cnpj
routes.get('/fundo/:cnpj', async (req: Request, res: Response) => {
  try {
    const { cnpj } = req.params;
    const fundos = await getFundDetails(cnpj);
    res.status(200).send(fundos);
  } catch (e) {
    res.send(400).send({
      error: 'Failed to fetch fund',
    });
  }
});

routes.get('/rentabilidade', async (req: Request, res: Response) => {
  try {
    const { fundos, from, to } = req.query;
    if (!fundos) {
      res.status(400).send({ error: 'Error in API request' });
      return;
    }
    const fundsChart = await getChart(
      fundos as string[],
      from as string | undefined,
      to as string | undefined
    );
    res.send(fundsChart);
  } catch (e) {
    res.status(400).send({
      error: 'Failed to create chart response',
    });
  }
});

routes.use(authentication);

// Adiciona um novo fundo no banco de dados, passando um body json
routes.post('/fundo', (req: Request, res: Response) => {
  try {
    addFundInfo(req.body);
    res.status(200).send();
  } catch (e) {
    res.status(400).send({
      error: 'Failed to add entities to database',
    });
  }
});

// Adiciona um novo fundo_update no banco de dados, passando um body json
routes.post('/update', (req: Request, res: Response) => {
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
