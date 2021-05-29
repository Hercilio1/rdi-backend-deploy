-- CreateTable
CREATE TABLE "Fundo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cnpj_fundo" TEXT NOT NULL,
    "auditor" TEXT,
    "cnpj_auditor" TEXT,
    "denom_social" TEXT,
    "dt_const" TIMESTAMP(3),
    "dt_cancel" TIMESTAMP(3),
    "admin" TEXT,
    "cd_cvm" TEXT,
    "dt_fim_exerc" TIMESTAMP(3),
    "classe" TEXT,
    "dt_ini_ativ" TIMESTAMP(3),
    "cnpj_admin" TEXT,
    "dt_ini_classe" TIMESTAMP(3),
    "dt_ini_exerc" TIMESTAMP(3),
    "condom" TEXT,
    "dt_ini_sit" TIMESTAMP(3),
    "cpf_cnpj_gestor" TEXT,
    "sit" TEXT,
    "rentab_fundo" TEXT,
    "pf_pj_gestor" TEXT,
    "invest_qualif" TEXT,
    "vl_patrim_liq" TEXT,
    "gestor" TEXT,
    "trib_lprazo" TEXT,
    "fundo_exclusivo" TEXT,
    "tp_fundo" TEXT,
    "fundo_cotas" TEXT,
    "taxa_perfm" TEXT,
    "dt_patrim_liq" TIMESTAMP(3),
    "taxa_adm" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundo_Update" (
    "id" SERIAL NOT NULL,
    "cnpj_fundo" TEXT NOT NULL,
    "vlr_total" TEXT,
    "vlt_quota" TEXT,
    "captc_dia" TEXT,
    "resg_dia" TEXT,
    "tp_fundo" TEXT,
    "dt_comptc" TIMESTAMP(3),
    "vl_patrim_liq" TEXT,
    "nr_cotst" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fundo.cnpj_fundo_unique" ON "Fundo"("cnpj_fundo");

-- CreateIndex
CREATE UNIQUE INDEX "Fundo_Update.cnpj_fundo_dt_comptc_unique" ON "Fundo_Update"("cnpj_fundo", "dt_comptc");

-- AddForeignKey
ALTER TABLE "Fundo_Update" ADD FOREIGN KEY ("cnpj_fundo") REFERENCES "Fundo"("cnpj_fundo") ON DELETE CASCADE ON UPDATE CASCADE;
