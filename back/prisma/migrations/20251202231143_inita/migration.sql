/*
  Warnings:

  - You are about to drop the column `evento` on the `participantes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participantes" DROP COLUMN "evento",
ADD COLUMN     "eventoId" INTEGER;

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
