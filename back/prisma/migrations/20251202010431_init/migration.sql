-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "senha" TEXT,
    "description" TEXT,
    "evento" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "participantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_sorteio" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grupos_sorteio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_participantes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "grupoId" UUID NOT NULL,
    "participanteId" UUID NOT NULL,

    CONSTRAINT "grupos_participantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presentes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "imagem" TEXT,
    "participanteId" UUID NOT NULL,

    CONSTRAINT "presentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sorteios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "grupoId" UUID NOT NULL,
    "participanteId" UUID NOT NULL,
    "participanteSorteadoId" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sorteios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grupos_participantes_grupoId_participanteId_key" ON "grupos_participantes"("grupoId", "participanteId");

-- CreateIndex
CREATE UNIQUE INDEX "sorteios_grupoId_participanteId_key" ON "sorteios"("grupoId", "participanteId");

-- AddForeignKey
ALTER TABLE "grupos_participantes" ADD CONSTRAINT "grupos_participantes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos_sorteio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_participantes" ADD CONSTRAINT "grupos_participantes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentes" ADD CONSTRAINT "presentes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sorteios" ADD CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos_sorteio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sorteios" ADD CONSTRAINT "sorteios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sorteios" ADD CONSTRAINT "sorteios_participanteSorteadoId_fkey" FOREIGN KEY ("participanteSorteadoId") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
