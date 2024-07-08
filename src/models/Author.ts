import db from '../db/db';
import { TAuthor } from '../types/author';
class AuthorModel {
  static async findAll(): Promise<TAuthor[]> {
    return db('authors').select('*');
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
