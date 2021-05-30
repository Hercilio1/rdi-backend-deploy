import axios from 'axios';

const getBenchmark = async (
  benchmark: string,
  from?: string,
  to?: string,
): Promise<{ data: string; valor: string }[]> => {
  /*
  * CÓDIGO 12: CDI
  * CÓDIGO 7832: BOVESPA
  * */
  const codeBenchmark = benchmark === 'CDI' ? 12 : 7832;
  const cdiRequest = await axios.get<{ data: string; valor: string }[]>(
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codeBenchmark}/dados`,
    {
      params: {
        formato: 'json',
        dataInicial: from,
        dataFinal: to,
      },
    }
  );
  return cdiRequest.data;
};

export default getBenchmark;
