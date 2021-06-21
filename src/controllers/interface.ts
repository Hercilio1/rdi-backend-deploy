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
  [cnpj_fundo: string]: IFundAttributes;
}

export interface IUpdate {
  CNPJ_FUNDO: string;
  TP_FUNDO: string;
  DT_COMPTC: string;
  VL_TOTAL: number;
  VL_QUOTA: number;
  VL_PATRIM_LIQ: number;
  CAPTC_DIA: number;
  RESG_DIA: number;
  NR_COTST: number;
}

export interface IInitialFundData {
  denom_social: string | null;
  cnpj_fundo: string | null;
  vl_patrim_liq: string | null;
  classe: string | null;
  nr_cotst: string | null;
}

export interface IFundDetails {
  cnpj_fundo: string | null;
  denom_social: string | null;
  tp_fundo: string | null;
  classe: string | null;
  vl_patrim_liq: number | null;
  sit: string | null;
  dt_ini_ativ: string | null;
  admin: string | null;
  cd_cvm: string | null;
  cnpj_admin: string | null;
  condom: string | null;
  cpf_cnpj_gestor: string | null;
  dt_cancel: string | null;
  dt_const: string | null;
  dt_fim_exerc: string | null;
  dt_ini_classe: string | null;
  dt_ini_exerc: string | null;
  dt_ini_sit: string | null;
  dt_patrim_liq: string | null;
  fundo_cotas: string | null;
  fundo_exclusivo: string | null;
  gestor: string | null;
  invest_qualif: string | null;
  pf_pj_gestor: string | null;
  rentab_fundo: string | null;
  taxa_adm: string | null;
  taxa_perfm: string | null;
  trib_lprazo: string | null;
  auditor: string | null;
  cnpj_auditor: string | null;
  vl_total: string | null;
  vl_quota: string | null;
  captc_dia: string | null;
  resg_dia: string | null;
  nr_cotst: string | null;
}

export interface IRentability {
  date: string;
  diff: number | null;
}
