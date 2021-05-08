export interface IFundAttributes {
  SIT: string;
  ADMIN: string;
  CD_CVM: string;
  CLASSE: string;
  CNPJ_ADMIN: string;
  CONDOM: string;
  CPF_CNPJ_GESTOR: string;
  DENOM_SOCIAL: string;
  DT_CANCEL: string;
  DT_CONST: string;
  DT_FIM_EXERC: string;
  DT_INI_ATIV: string;
  DT_INI_CLASSE: string;
  DT_INI_EXERC: string;
  DT_INI_SIT: string;
  DT_PATRIM_LIQ: string;
  FUNDO_COTAS: string;
  FUNDO_EXCLUSIVO: string;
  GESTOR: string;
  INVEST_QUALIF: string;
  PF_PJ_GESTOR: string;
  RENTAB_FUNDO: string;
  TAXA_ADM: number;
  TAXA_PERFM: number;
  TP_FUNDO: string;
  TRIB_LPRAZO: string;
  VL_PATRIM_LIQ: number;
  AUDITOR: string;
  CNPJ_AUDITOR: string;
}

export interface IFunds {
  [cnpj_fundo: string]: IFundAttributes
}

export interface IUpdate{
  [cnpj_fundo: string]:{
    TP_FUNDO: string;
    DT_COMPTC: string;
    VL_TOTAL: number;
    VL_QUOTA: number;
    VL_PATRIM_LIQ: number;
    CAPTC_DIA: number;
    RESG_DIA: number;
    NR_COTST: number;
  };
}
