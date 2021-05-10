import { Fundo } from '@prisma/client';
import prisma from '../database/prisma';
import { IFunds, IUpdate } from './interface';

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
  skip?: string
): Promise<Fundo[]> => {
  const fundos = await prisma.fundo.findMany({
    where: {
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
    take: 50,
    skip: skip ? parseInt(skip, 10) : 0,
  });
  return fundos;
};

export const fundUpdate = async (file: IUpdate): Promise<void> => {
  const funds = Object.entries(file);
  // eslint-disable-next-line
  for (const line of funds) {
    const {
      TP_FUNDO,
      DT_COMPTC,
      VL_TOTAL,
      VL_QUOTA,
      VL_PATRIM_LIQ,
      CAPTC_DIA,
      RESG_DIA,
      NR_COTST,
    } = line[1];

    try {
      // eslint-disable-next-line
      await prisma.fundo.update({
        where: {
          cnpj_fundo: line[0],
        },
        data: {
          updates: {
            create: {
              vlr_total: String(VL_TOTAL),
              vlt_quota: String(VL_QUOTA),
              captc_dia: String(CAPTC_DIA),
              resg_dia: String(RESG_DIA),
              rentabilidade: '',
              tp_fundo: TP_FUNDO,
              dt_comptc: new Date(DT_COMPTC) || null,
              vl_patrim_liq: String(VL_PATRIM_LIQ),
              nr_cotst: String(NR_COTST),
            },
          },
        },
      });
    } catch (e) {
      console.log(`Fund update error: ${line[0]}`);
    }
  }
};
