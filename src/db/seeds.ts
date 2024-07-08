// Example: Seed file for authors
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('authors').del();

  // Inserts seed entries
  await knex('authors').insert([
    {
      name: 'Jane Smith',
      bio: 'Author of several best-selling novels.',
      birthdate: '1985-08-20',
    },
    {
      name: 'John Doe',
      bio: 'Renowned poet and essayist.',
      birthdate: '1979-04-15',
    },
    // More seed data as needed
  ]);
}
