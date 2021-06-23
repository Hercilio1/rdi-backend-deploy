import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IRentability } from '../controllers/interface';

dayjs.extend(customParseFormat);

const accumulate = (
  list: { data: string; valor: string }[]
): IRentability[] => {
  const accumulation: IRentability[] = [];

  list.forEach((entry) => {
    if (accumulation.length === 0) {
      accumulation.push({
        date: dayjs(entry.data, 'DD/MM/YYYY').toISOString(),
        diff: 0,
      });
    } else {
      accumulation.push({
        date: dayjs(entry.data, 'DD/MM/YYYY').toISOString(),
        diff: parseFloat(
          (
            (parseFloat(entry.valor) + 1) *
              ((accumulation[accumulation.length - 1].diff || 0) + 1) -
            1
          ).toFixed(2)
        ),
      });
    }
  });

  return accumulation;
};

export default accumulate;
