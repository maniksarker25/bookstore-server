import db from '../db/db';
import { TAuthor } from '../types/author';
class AuthorModel {
  static async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    authors: TAuthor[];
    total: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;

    // Fetch authors for the current page and limit
    const authors = await db('authors').select('*').limit(limit).offset(offset);

    // Fetch total count of authors
    const [{ count }] = await db('authors').count('* as count');
    const total = Number(count);

    return {
      authors,
      total,
      page,
      limit,
    };
  }

  static async findById(id: number): Promise<TAuthor | undefined> {
    return db('authors').where({ id }).first();
  }

  static async create(author: TAuthor): Promise<number[]> {
    return db('authors').insert(author).returning('id');
  }

  static async update(id: number, author: Partial<TAuthor>): Promise<number> {
    await db('authors').where({ id }).update(author);
    const updatedAuthor = await db('authors').where({ id }).first();
    return updatedAuthor;
  }

  static async delete(id: number): Promise<number> {
    return db('authors').where({ id }).del();
  }
}

export default AuthorModel;
