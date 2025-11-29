import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Sorteio', (table) => {
    table.string('id_participante').notNullable(); // UUID7
    table.string('id_participante_sorteado').notNullable(); // UUID7
    table.primary(['id_participante', 'id_participante_sorteado']);
    table.foreign('id_participante').references('id').inTable('Participante');
    table.foreign('id_participante_sorteado').references('id').inTable('Participante');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Sorteio');
}
