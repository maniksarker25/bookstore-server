// import knex from 'knex';
import { TBook } from '../types/book';
import db from '../db/db';

class BookModal {
  static async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ books: TBook[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const books = await db('books').select('*').limit(limit).offset(offset);
    const [{ count }] = await db('books').count('* as count');
    const total = Number(count);
    return {
      books,
      total,
      page,
      limit,
    };
  }

  static async findById(id: number): Promise<TBook | undefined> {
    return db('books').where({ id }).first();
  }

  static async create(book: TBook): Promise<number[]> {
    return db('books').insert(book).returning('id');
  }

  static async update(id: number, book: Partial<TBook>): Promise<number> {
    await db('books').where({ id }).update(book);
    const updatedBook = await db('books').where({ id }).first();
    return updatedBook;
  }

  static async delete(id: number): Promise<number> {
    return db('books').where({ id }).del();
  }

  static async findByAuthorId(authorId: number): Promise<TBook[]> {
    return db('books').where({ author_id: authorId });
  }
}

export default BookModal;
