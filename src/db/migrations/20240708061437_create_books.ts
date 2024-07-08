import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('books', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.date('published_date').notNullable();
    table.integer('author_id').unsigned().notNullable();
    table.foreign('author_id').references('authors.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('books');
}
