import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Presente', (table) => {
    table.string('id').primary(); // UUID7
    table.string('nome').notNullable();
    table.string('id_participante').notNullable(); // UUID7
    table.string('descricao');
    table.string('imagem');
    table.foreign('id_participante').references('id').inTable('Participante');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Presente');
}
