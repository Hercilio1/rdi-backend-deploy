import dayjs from 'dayjs';
import prisma from '../database/prisma';
import {
  IFunds,
  IInitialFundData,
  IUpdate,
  IFundDetails,
  IRentability,
} from './interface';
import accumulate from '../utils/accumulate';
import getBenchmark from '../benchmarks/benchmarks';
import { updateSourceFile, visitFunctionBody } from 'typescript';
import { kMaxLength } from 'buffer';

export const addFundInfo = async (file: IFunds): Promise<void> => {
  const funds = Object.entries(file);

  // eslint-disable-next-line
  for (const line of funds) {
    const {
      ADMIN,
      AUDITOR,
      CD_CVM,
      CLASSE,
      CNPJ_ADMIN,
      CNPJ_AUDITOR,
      CONDOM,
      CPF_CNPJ_GESTOR,
      DENOM_SOCIAL,
      DT_CANCEL,
      DT_CONST,
      DT_FIM_EXERC,
      DT_INI_ATIV,
      DT_INI_CLASSE,
      DT_INI_EXERC,
      DT_INI_SIT,
      DT_PATRIM_LIQ,
      FUNDO_COTAS,
      FUNDO_EXCLUSIVO,
      GESTOR,
      INVEST_QUALIF,
      PF_PJ_GESTOR,
      RENTAB_FUNDO,
      SIT,
      TAXA_ADM,
      TAXA_PERFM,
      TP_FUNDO,
      TRIB_LPRAZO,
      VL_PATRIM_LIQ,
    } = line[1];

    try {
      // eslint-disable-next-line
      await prisma.fundo.upsert({
        create: {
          cnpj_fundo: line[0],
          dt_cancel: new Date(DT_CANCEL) || null,
          admin: ADMIN,
          cd_cvm: CD_CVM,
          dt_fim_exerc: new Date(DT_FIM_EXERC) || null,
          classe: CLASSE,
          dt_ini_ativ: new Date(DT_INI_ATIV) || null,
          cnpj_admin: CNPJ_ADMIN,
          dt_ini_classe: new Date(DT_INI_CLASSE) || null,
          dt_ini_exerc: new Date(DT_INI_EXERC) || null,
          condom: CONDOM,
          dt_ini_sit: new Date(DT_INI_SIT) || null,
          cpf_cnpj_gestor: CPF_CNPJ_GESTOR,
          sit: SIT,
          rentab_fundo: RENTAB_FUNDO,
          pf_pj_gestor: PF_PJ_GESTOR,
          invest_qualif: INVEST_QUALIF,
          vl_patrim_liq: String(VL_PATRIM_LIQ),
          gestor: GESTOR,
          trib_lprazo: TRIB_LPRAZO,
          fundo_exclusivo: FUNDO_EXCLUSIVO,
          tp_fundo: TP_FUNDO,
          fundo_cotas: FUNDO_COTAS,
          taxa_perfm: String(TAXA_PERFM),
          dt_patrim_liq: new Date(DT_PATRIM_LIQ) || null,
          taxa_adm: String(TAXA_ADM),
          auditor: AUDITOR,
          denom_social: DENOM_SOCIAL,
          cnpj_auditor: CNPJ_AUDITOR,
          dt_const: new Date(DT_CONST) || null,
        },
        update: {
          dt_cancel: new Date(DT_CANCEL) || null,
          admin: ADMIN,
          cd_cvm: CD_CVM,
          dt_fim_exerc: new Date(DT_FIM_EXERC) || null,
          classe: CLASSE,
          dt_ini_ativ: new Date(DT_INI_ATIV) || null,
          cnpj_admin: CNPJ_ADMIN,
          dt_ini_classe: new Date(DT_INI_CLASSE) || null,
          dt_ini_exerc: new Date(DT_INI_EXERC) || null,
          condom: CONDOM,
          dt_ini_sit: new Date(DT_INI_SIT) || null,
          cpf_cnpj_gestor: CPF_CNPJ_GESTOR,
          sit: SIT,
          rentab_fundo: RENTAB_FUNDO,
          pf_pj_gestor: PF_PJ_GESTOR,
          invest_qualif: INVEST_QUALIF,
          vl_patrim_liq: String(VL_PATRIM_LIQ),
          gestor: GESTOR,
          trib_lprazo: TRIB_LPRAZO,
          fundo_exclusivo: FUNDO_EXCLUSIVO,
          tp_fundo: TP_FUNDO,
          fundo_cotas: FUNDO_COTAS,
          taxa_perfm: String(TAXA_PERFM),
          dt_patrim_liq: new Date(DT_PATRIM_LIQ) || null,
          taxa_adm: String(TAXA_ADM),
          auditor: AUDITOR,
          denom_social: DENOM_SOCIAL,
          cnpj_auditor: CNPJ_AUDITOR,
          dt_const: new Date(DT_CONST) || null,
        },
        where: {
          cnpj_fundo: line[0],
        },
      });
    } catch (e) {
      console.log(`Fund insertion error: ${line[0]}`);
    }
  }
};

export const getFunds = async (
  search?: string,
  skip?: string,
  classes?: string[],
  pl?: string,
  cotistas?: string
): Promise<IInitialFundData[]> => {
  const fundos = await prisma.fundo.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              denom_social: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
            {
              cnpj_fundo: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          classe: {
            in: classes,
          },
        },
      ],
    },
    select: {
      denom_social: true,
      cnpj_fundo: true,
      vl_patrim_liq: true,
      classe: true,
      updates: {
        select: {
          nr_cotst: true,
        },
      },
    },
    take: 50,
    skip: skip ? parseInt(skip, 10) : 0,
  });
  const searchList = fundos
    .map((fund) => {
      if (
        parseInt(fund.updates[fund.updates.length - 1]?.nr_cotst || '0', 10) >=
        parseInt(cotistas || '0', 10) 
        &&
        parseFloat(fund.vl_patrim_liq || '0') >= parseFloat(pl || '0')
      ) {
        return {
          ...fund,
          updates: undefined,
          nr_cotst: fund.updates[fund.updates.length - 1]?.nr_cotst,
        };
      }
      return undefined;
    })
    .filter((x) => x);

  return searchList as IInitialFundData[];
};

export const fundUpdate = async (file: IUpdate[]): Promise<void> => {
  // eslint-disable-next-line
  for (const line of file) {
    const {
      CNPJ_FUNDO,
      TP_FUNDO,
      DT_COMPTC,
      VL_TOTAL,
      VL_QUOTA,
      VL_PATRIM_LIQ,
      CAPTC_DIA,
      RESG_DIA,
      NR_COTST,
    } = line;

    try {
      // eslint-disable-next-line
      await prisma.fundo.update({
        where: {
          cnpj_fundo: String(CNPJ_FUNDO),
        },
        data: {
          updates: {
            upsert: {
              where: {
                cnpj_fundo_dt_comptc: {
                  cnpj_fundo: CNPJ_FUNDO,
                  dt_comptc: new Date(DT_COMPTC),
                },
              },
              update: {
                vlr_total: String(VL_TOTAL),
                vlt_quota: String(VL_QUOTA),
                captc_dia: String(CAPTC_DIA),
                resg_dia: String(RESG_DIA),
                tp_fundo: TP_FUNDO,
                dt_comptc: new Date(DT_COMPTC) || null,
                vl_patrim_liq: String(VL_PATRIM_LIQ),
                nr_cotst: String(NR_COTST),
              },
              create: {
                vlr_total: String(VL_TOTAL),
                vlt_quota: String(VL_QUOTA),
                captc_dia: String(CAPTC_DIA),
                resg_dia: String(RESG_DIA),
                tp_fundo: TP_FUNDO,
                dt_comptc: new Date(DT_COMPTC) || null,
                vl_patrim_liq: String(VL_PATRIM_LIQ),
                nr_cotst: String(NR_COTST),
              },
            },
          },
        },
      });
    } catch (e) {
      console.log(`Fund update error: ${CNPJ_FUNDO}`);
    }
  }
};

export const getFundDetails = async (
  cnpj: string
): Promise<IFundDetails | Record<string, never>> => {
  const fundosDetail = await prisma.fundo.findFirst({
    where: {
      cnpj_fundo: cnpj,
    },
    select: {
      denom_social: true,
      cnpj_fundo: true,
      classe: true,
      vl_patrim_liq: true,
      tp_fundo: true,
      sit: true,
      dt_ini_ativ: true,
      admin: true,
      cd_cvm: true,
      cnpj_admin: true,
      condom: true,
      cpf_cnpj_gestor: true,
      dt_cancel: true,
      dt_const: true,
      dt_fim_exerc: true,
      dt_ini_classe: true,
      dt_ini_exerc: true,
      dt_ini_sit: true,
      dt_patrim_liq: true,
      fundo_cotas: true,
      fundo_exclusivo: true,
      gestor: true,
      invest_qualif: true,
      pf_pj_gestor: true,
      rentab_fundo: true,
      taxa_adm: true,
      taxa_perfm: true,
      trib_lprazo: true,
      auditor: true,
      cnpj_auditor: true,
      updates: {
        select: {
          tp_fundo: true,
          dt_comptc: true,
          vlr_total: true,
          vlt_quota: true,
          captc_dia: true,
          resg_dia: true,
          nr_cotst: true,
        },
      },
    },
  });

  let response = {};
  try {
    if (fundosDetail) {
      response = {
        ...fundosDetail,
        updates: undefined,
        tp_fundo: fundosDetail.updates[fundosDetail.updates.length - 1]?.tp_fundo,
        dt_comptc:
          fundosDetail.updates[fundosDetail.updates.length - 1]?.dt_comptc,
        vlr_total:
          fundosDetail.updates[fundosDetail.updates.length - 1]?.vlr_total,
        vlt_quota:
          fundosDetail.updates[fundosDetail.updates.length - 1]?.vlt_quota,
        captc_dia:
          fundosDetail.updates[fundosDetail.updates.length - 1]?.captc_dia,
        resg_dia: fundosDetail.updates[fundosDetail.updates.length - 1]?.resg_dia,
        nr_cotst: fundosDetail.updates[fundosDetail.updates.length - 1]?.nr_cotst,
      };
    } 
  } catch (e) {
      console.error(
        `Error when getting details of the fund \n error: ${e}`
      );
    }

  return response;
};

export const getChart = async (
  fundos: string[],
  from?: string,
  to?: string
): Promise<{ name: string; rentab: IRentability[] }[]> => {
  const cdiBenchmark = await getBenchmark(
    'CDI',
    from ? dayjs(from).format('DD/MM/YYYY') : undefined,
    to ? dayjs(to).format('DD/MM/YYYY') : undefined
  );
//  console.log(from)
// console.log(new Date(from && from === "" ? from : "2015-06-18"))

  const cdiRentability = accumulate(cdiBenchmark);

  const fundosQuery = await prisma.fundo.findMany({
    where: {
      cnpj_fundo: {
        in: fundos,
      },
    },
    include: {
      updates: {
        where: {
          dt_comptc: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
        },
        orderBy: {
          dt_comptc: 'asc',
        },
      },
    },
  });

  const fundosResponse = [];
  const nullArray: IRentability[] = []
  cdiRentability.forEach(val => nullArray.push(Object.assign({}, val)));
  nullArray.map((data) => {
    data.diff = null;
  });

  try {
    for (const fundo of fundosQuery) {
      var fundoRent: IRentability[] = [];
      nullArray.forEach(val => fundoRent.push(Object.assign({}, val)));
      if (fundo.updates.length < 1) {
        fundosResponse.push({
          name: fundo.denom_social || '',
          rentab: [],
        });
        continue;
      }
      const quota1 = parseFloat(fundo.updates[0].vlt_quota || '1');
      fundo.updates.forEach((update) => {
        try {
          const rentabilidade =
            (parseFloat(update.vlt_quota || '1') / quota1 - 1) * 100;
          fundoRent.map((data) => {
            if (data.date == (update.dt_comptc?.toISOString())) {
              data.diff = parseFloat(rentabilidade.toFixed(2));
            }
          }); 
        } catch (e) {
          console.error(
            `Error in the generation of the profitability of the fund ${fundo.cnpj_fundo} \n error: ${e}`
          );
        }
      });
      fundosResponse.push({
        name: fundo.denom_social || '',
        rentab: fundoRent,
      });
    }      
  } catch (e) {
    console.error(
      `Error in the generation of the profitability of the funds ${e}`
    );
  }

  fundosResponse.push({
    name: 'CDI',
    rentab: cdiRentability,
  });

  return fundosResponse;
};

export const getComparacao = async (
  fund: string[]
): Promise<IInitialFundData[]> => {
  const fundoArray = await prisma.fundo.findMany({
    where: {
      cnpj_fundo: {
        in: fund,
      },
    },
    select: {
      denom_social: true,
      cnpj_fundo: true,
      vl_patrim_liq: true,
      classe: true,
      updates: {
        select: {
          nr_cotst: true,
        },
      },
    },
  });

  return fundoArray.map((fundo) => ({
    ...fundo,
    updates: undefined,
    nr_cotst: fundo.updates[fundo.updates.length - 1]?.nr_cotst,
  }));
};

export const getVolatility = async (
  fundos: string[],
  from?: string,
  to?: string
): Promise<{ name: string; rentab: IRentability[] }[]> => {

  const fundosQuery = await prisma.fundo.findMany({
    where: {
      cnpj_fundo: {
        in: fundos,
      },
    },
    include: {
      updates: {
        where: {
          dt_comptc: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
        },
        orderBy: {
          dt_comptc: 'asc',
        },
      },
    },
  });
  const fundosResponse = [];
  const math = require('mathjs');

  // eslint-disable-next-line
  for (const fundo of fundosQuery) {
    const volatility: IRentability[] = [];
    
    const fundArrAux: number[] = [];
    for(var i = 1; i < fundo.updates?.length; i++) {
      fundArrAux.push(parseFloat(fundo.updates[i]?.vlt_quota || '1') - parseFloat(fundo.updates[i - 1]?.vlt_quota || '1'))
    }

    for (var i = 21; i < fundArrAux.length; i++) {
      const aux = math.std(fundArrAux.slice(i-21, i)) * Math.sqrt(252);
      volatility.push({
        diff: parseFloat(aux.toFixed(3)),
        date: fundo.updates[i]?.dt_comptc?.toISOString() || '',
      });
    }

    fundosResponse.push({
      name: fundo.denom_social || '',
      rentab: volatility,
    });
  }

  return fundosResponse;
};