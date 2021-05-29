import fs from 'fs';
import { PrismaClient } from '@prisma/client';


interface IUpdate {
    cnpj_fundo: string;
    tp_fundo: string;
    dt_comptc: string;
    vlr_total: string;
    vlt_quota: string;
    vl_patrim_liq: string;
    captc_dia: string;
    resg_dia: string;
    nr_cotst: string;
}

interface IFunds {
  cnpj_fundo: string;
  auditor: string;
  cnpj_auditor: string;
  denom_social: string;
  dt_const: string;
  dt_cancel: string;
  admin: string;
  cd_cvm: string;
  dt_fim_exerc: string;
  classe: string;
  dt_ini_ativ: string;
  cnpj_admin: string;
  dt_ini_classe: string;
  dt_ini_exerc: string;
  condom: string;
  dt_ini_sit: string;
  cpf_cnpj_gestor: string;
  sit: string;
  rentab_fundo: string;
  pf_pj_gestor: string;
  invest_qualif: string;
  vl_patrim_liq: string;
  gestor: string;
  trib_lprazo: string;
  fundo_exclusivo: string;
  tp_fundo: string;
  fundo_cotas: string;
  taxa_perfm: string;
  dt_patrim_liq: string;
  taxa_adm: string;
}

const prisma = new PrismaClient();

async function main() {
  const fundos = fs.readFileSync('prisma/fundosMock.json', 'utf-8');

  const parsedFunds: IFunds[] = JSON.parse(fundos);

  await Promise.all(
    parsedFunds.map(async (fund) => {
      await prisma.fundo.create({
        data: {
          ...fund,
          dt_const: new Date(fund.dt_const),
          dt_fim_exerc: new Date(fund.dt_fim_exerc),
          dt_ini_ativ: new Date(fund.dt_ini_ativ),
          dt_ini_classe: new Date(fund.dt_ini_classe),
          dt_ini_exerc: new Date(fund.dt_ini_exerc),
          dt_ini_sit: new Date(fund.dt_ini_sit),
          dt_patrim_liq: new Date(fund.dt_patrim_liq),
          taxa_adm: String(fund.taxa_adm),
          taxa_perfm: String(fund.taxa_perfm),
          vl_patrim_liq: String(fund.vl_patrim_liq),
        },
      });
    })
  );
  const updates = fs.readFileSync('prisma/fundosUpdatesMock.json', 'utf-8');
  const parsedUpdates: IUpdate[] = JSON.parse(updates);

  await Promise.all(
    parsedUpdates.map(async (update) => {
      await prisma.fundo_Update.create({
        data: {
            ...update,
            vlr_total: String(update.vlr_total),
            vlt_quota: String(update.vlt_quota),
            captc_dia: String(update.captc_dia),
            resg_dia: String(update.resg_dia),
            tp_fundo: String(update.tp_fundo),
            dt_comptc: new Date(update.dt_comptc) || null,
            vl_patrim_liq: String(update.vl_patrim_liq),
            nr_cotst: String(update.nr_cotst)
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
