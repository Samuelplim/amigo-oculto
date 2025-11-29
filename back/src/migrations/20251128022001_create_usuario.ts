import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Usuario', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('senha').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Usuario');
}
