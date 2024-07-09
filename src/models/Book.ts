// import knex from 'knex';
import { TBook } from '../types/book';
import db from '../db/db';

class BookModal {
  static async findAll(): Promise<TBook[]> {
    return db('books').select('*');
  }

  static async findById(id: number): Promise<TBook | undefined> {
    return db('books').where({ id }).first();
  }

  static async create(book: TBook): Promise<number[]> {
    return db('books').insert(book).returning('id');
  }

  static async update(id: number, book: Partial<TBook>): Promise<number> {
    return db('books').where({ id }).update(book);
  }

  static async delete(id: number): Promise<number> {
    return db('books').where({ id }).del();
  }

  static async findByAuthorId(authorId: number): Promise<TBook[]> {
    return db('books').where({ author_id: authorId });
  }
}

export default BookModal;
