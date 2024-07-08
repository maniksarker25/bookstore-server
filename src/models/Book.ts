import knex from 'knex';
import { TBook } from '../types/book';

class BookModal {
  static async findAll(): Promise<TBook[]> {
    return knex('books').select('*');
  }

  static async findById(id: number): Promise<TBook | undefined> {
    return knex('books').where({ id }).first();
  }

  static async create(book: TBook): Promise<number[]> {
    return knex('books').insert(book).returning('id');
  }

  static async update(id: number, book: Partial<TBook>): Promise<number> {
    return knex('books').where({ id }).update(book);
  }

  static async delete(id: number): Promise<number> {
    return knex('books').where({ id }).del();
  }

  static async findByAuthorId(authorId: number): Promise<TBook[]> {
    return knex('books').where({ author_id: authorId });
  }
}

export default BookModal;
