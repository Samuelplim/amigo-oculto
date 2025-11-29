import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Participante', (table) => {
    table.string('id').primary(); // UUID7
    table.string('nome').notNullable();
    table.string('senha');
    table.string('description');
    table.string('id_participante').notNullable(); // UUID7
    table.string('evento').notNullable();
    table.string('created').notNullable();
    table.string('updated').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Participante');
}
