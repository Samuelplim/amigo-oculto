-- DROP SCHEMA amigos;

CREATE SCHEMA amigos AUTHORIZATION postgres;

-- amigos.eventos definição

-- Drop table

-- DROP TABLE amigos.eventos;

CREATE TABLE amigos.eventos ( nome text NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated timestamp(3) NOT NULL, id serial4 NOT NULL, CONSTRAINT eventos_pkey PRIMARY KEY (id));


-- amigos.usuarios definição

-- Drop table

-- DROP TABLE amigos.usuarios;

CREATE TABLE amigos.usuarios ( id serial4 NOT NULL, nome text NOT NULL, senha text NOT NULL, CONSTRAINT usuarios_pkey PRIMARY KEY (id));


-- amigos.participantes definição

-- Drop table

-- DROP TABLE amigos.participantes;

CREATE TABLE amigos.participantes ( id uuid DEFAULT gen_random_uuid() NOT NULL, nome text NOT NULL, senha text NULL, description text NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated timestamp(3) NOT NULL, "eventoId" int4 NULL, CONSTRAINT participantes_pkey PRIMARY KEY (id), CONSTRAINT "participantes_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES amigos.eventos(id) ON DELETE CASCADE ON UPDATE CASCADE);


-- amigos.presentes definição

-- Drop table

-- DROP TABLE amigos.presentes;

CREATE TABLE amigos.presentes ( id uuid DEFAULT gen_random_uuid() NOT NULL, nome text NOT NULL, descricao text NULL, imagem text NULL, "participanteId" uuid NOT NULL, CONSTRAINT presentes_pkey PRIMARY KEY (id), CONSTRAINT "presentes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);


-- amigos.sorteios definição

-- Drop table

-- DROP TABLE amigos.sorteios;

CREATE TABLE amigos.sorteios ( id uuid DEFAULT gen_random_uuid() NOT NULL, "participanteId" uuid NOT NULL, "participanteSorteadoId" uuid NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, "grupoId" int4 NOT NULL, CONSTRAINT sorteios_pkey PRIMARY KEY (id), CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES amigos.eventos(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteSorteadoId_fkey" FOREIGN KEY ("participanteSorteadoId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE UNIQUE INDEX "sorteios_grupoId_participanteId_key" ON amigos.sorteios USING btree ("grupoId", "participanteId");


-- amigos.grupos_participantes definição

-- Drop table

-- DROP TABLE amigos.grupos_participantes;

CREATE TABLE amigos.grupos_participantes ( id uuid DEFAULT gen_random_uuid() NOT NULL, "participanteId" uuid NOT NULL, "grupoId" int4 NOT NULL, CONSTRAINT grupos_participantes_pkey PRIMARY KEY (id), CONSTRAINT "grupos_participantes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES amigos.eventos(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "grupos_participantes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE UNIQUE INDEX "grupos_participantes_grupoId_participanteId_key" ON amigos.grupos_participantes USING btree ("grupoId", "participanteId");