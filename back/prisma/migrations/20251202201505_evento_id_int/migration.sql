/*
  Warnings:

  - The primary key for the `eventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `eventos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `grupoId` on the `grupos_participantes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grupoId` on the `sorteios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "grupos_participantes" DROP CONSTRAINT "grupos_participantes_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "sorteios" DROP CONSTRAINT "sorteios_grupoId_fkey";

-- AlterTable
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "eventos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "grupos_participantes" DROP COLUMN "grupoId",
ADD COLUMN     "grupoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sorteios" DROP COLUMN "grupoId",
ADD COLUMN     "grupoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "grupos_participantes_grupoId_participanteId_key" ON "grupos_participantes"("grupoId", "participanteId");

-- CreateIndex
CREATE UNIQUE INDEX "sorteios_grupoId_participanteId_key" ON "sorteios"("grupoId", "participanteId");

-- AddForeignKey
ALTER TABLE "grupos_participantes" ADD CONSTRAINT "grupos_participantes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sorteios" ADD CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
