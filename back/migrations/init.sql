-- DROP SCHEMA amigos;

CREATE SCHEMA amigos AUTHORIZATION postgres;

-- DROP SEQUENCE amigos.eventos_id_seq;

CREATE SEQUENCE amigos.eventos_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE amigos.usuarios_id_seq;

CREATE SEQUENCE amigos.usuarios_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- amigos.eventos definição

-- Drop table

-- DROP TABLE amigos.eventos;

CREATE TABLE amigos.eventos ( nome text NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated timestamp(3) NOT NULL, id serial4 NOT NULL, "local" text NULL, "dataRealizacao" timestamptz NULL, CONSTRAINT eventos_pkey PRIMARY KEY (id));


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

CREATE TABLE amigos.sorteios ( id uuid DEFAULT gen_random_uuid() NOT NULL, "participanteId" uuid NOT NULL, "participanteSorteadoId" uuid NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, "eventoId" int4 NOT NULL, CONSTRAINT sorteios_pkey PRIMARY KEY (id), CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("eventoId") REFERENCES amigos.eventos(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteSorteadoId_fkey" FOREIGN KEY ("participanteSorteadoId") REFERENCES amigos.participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE UNIQUE INDEX "sorteios_grupoId_participanteId_key" ON amigos.sorteios USING btree ("eventoId", "participanteId");