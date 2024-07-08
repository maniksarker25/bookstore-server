import knex from 'knex';
import { TAuthor } from '../types/author';

class AuthorModel {
  static async findAll(): Promise<TAuthor[]> {
    return knex('authors').select('*');
  }

  static async findById(id: number): Promise<TAuthor> {
    return knex('authors').where({ id }).first();
  }

  static async create(author: TAuthor): Promise<number[]> {
    return knex('authors').insert(author).returning('id');
  }

  static async update(id: number, author: Partial<TAuthor>): Promise<number> {
    return knex('authors').where({ id }).update(author);
  }

  static async delete(id: number): Promise<number> {
    return knex('authors').where({ id }).del();
  }
}

export default AuthorModel;
