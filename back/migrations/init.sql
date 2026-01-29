-- DROP SCHEMA amigos;

CREATE SCHEMA amigos AUTHORIZATION postgres;

-- DROP SEQUENCE eventos_id_seq;

CREATE SEQUENCE eventos_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE eventos_id_seq1;

CREATE SEQUENCE eventos_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE usuarios_id_seq;

CREATE SEQUENCE usuarios_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE usuarios_id_seq1;

CREATE SEQUENCE usuarios_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.eventos definição

-- Drop table

-- DROP TABLE eventos;

CREATE TABLE eventos ( nome text NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, id serial4 NOT NULL, "local" text NULL, "dataRealizacao" timestamptz NULL, CONSTRAINT eventos_pkey PRIMARY KEY (id));


-- public.usuarios definição

-- Drop table

-- DROP TABLE usuarios;

CREATE TABLE usuarios ( id serial4 NOT NULL, nome text NOT NULL, senha text NOT NULL, CONSTRAINT usuarios_pkey PRIMARY KEY (id));


-- public.participantes definição

-- Drop table

-- DROP TABLE participantes;

CREATE TABLE participantes ( id uuid DEFAULT gen_random_uuid() NOT NULL, nome text NOT NULL, senha text NULL, description text NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, updated timestamp(3) NOT NULL, "eventoId" int4 NULL, CONSTRAINT participantes_pkey PRIMARY KEY (id), CONSTRAINT "participantes_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES eventos(id) ON DELETE CASCADE ON UPDATE CASCADE);


-- public.presentes definição

-- Drop table

-- DROP TABLE presentes;

CREATE TABLE presentes ( id uuid DEFAULT gen_random_uuid() NOT NULL, nome text NOT NULL, descricao text NULL, imagem text NULL, "participanteId" uuid NOT NULL, CONSTRAINT presentes_pkey PRIMARY KEY (id), CONSTRAINT "presentes_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);


-- public.sorteios definição

-- Drop table

-- DROP TABLE sorteios;

CREATE TABLE sorteios ( id uuid DEFAULT gen_random_uuid() NOT NULL, "participanteId" uuid NOT NULL, "participanteSorteadoId" uuid NOT NULL, created timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL, "eventoId" int4 NOT NULL, CONSTRAINT sorteios_pkey PRIMARY KEY (id), CONSTRAINT "sorteios_grupoId_fkey" FOREIGN KEY ("eventoId") REFERENCES eventos(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES participantes(id) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "sorteios_participanteSorteadoId_fkey" FOREIGN KEY ("participanteSorteadoId") REFERENCES participantes(id) ON DELETE CASCADE ON UPDATE CASCADE);
CREATE UNIQUE INDEX "sorteios_grupoId_participanteId_key" ON public.sorteios USING btree ("eventoId", "participanteId");