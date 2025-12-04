/*
  Warnings:

  - You are about to drop the `grupos_sorteio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "grupos_participantes" DROP CONSTRAINT "grupos_participantes_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "sorteios" DROP CONSTRAINT "sorteios_grupoId_fkey";

-- DropTable
DROP TABLE "grupos_sorteio";

-- CreateTable
CREATE TABLE "eventos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "grupos_participantes" ADD CONSTRAINT "grupos_participantes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sorteios" ADD CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
