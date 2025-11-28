import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	// Tabela Usuario
	await knex.schema.createTable('usuario', (table) => {
		table.increments('id').primary();
		table.string('nome', 255).notNullable();
		table.string('senha', 255).notNullable();
	});

	// Tabela Participante
	await knex.schema.createTable('participante', (table) => {
		table.string('id', 36).primary(); // UUID7
		table.string('nome', 255).notNullable();
		table.string('senha', 255);
		table.text('description');
		table.string('id_participante', 36).notNullable(); // UUID7
		table.string('evento', 255).notNullable();
		table.timestamp('created').defaultTo(knex.fn.now());
		table.timestamp('updated').defaultTo(knex.fn.now());
	});

	// Tabela Sorteio
	await knex.schema.createTable('sorteio', (table) => {
		table.string('id_participante', 36).notNullable(); // UUID7
		table.string('id_participante_sorteado', 36).notNullable(); // UUID7
		table.primary(['id_participante', 'id_participante_sorteado']);
	});

	// Tabela Presente
	await knex.schema.createTable('presente', (table) => {
		table.string('id', 36).primary(); // UUID7
		table.string('nome', 255).notNullable();
		table.string('id_participante', 36).notNullable(); // UUID7
		table.text('descricao');
		table.string('imagem', 255);
		table.foreign('id_participante').references('id').inTable('participante');
	});
}


export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('presente');
	await knex.schema.dropTableIfExists('sorteio');
	await knex.schema.dropTableIfExists('participante');
	await knex.schema.dropTableIfExists('usuario');
}

