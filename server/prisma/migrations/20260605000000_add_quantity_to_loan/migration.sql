-- A tabela "Loan" já existe em produção (criada por 20260516201505_final) e pode
-- conter linhas. ADD COLUMN ... NOT NULL sem default falharia numa tabela não-vazia,
-- então usamos DEFAULT 1 para o backfill seguro das linhas existentes.
ALTER TABLE "Loan" ADD COLUMN "quantity" INTEGER NOT NULL DEFAULT 1;
