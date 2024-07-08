import db from '../db/db'; // Adjust the path as per your project structure
import { TAuthor } from '../types/author'; // Adjust the path as per your project structure

class AuthorModel {
  static async findAll(): Promise<TAuthor[]> {
    return db('authors').select('*');
  }

  static async findById(id: number): Promise<TAuthor | undefined> {
    return db('authors').where({ id }).first();
  }

  static async create(author: TAuthor): Promise<number[]> {
    return db('authors').insert(author).returning('id'); // Ensure 'db' is configured for PostgreSQL
  }

  static async update(id: number, author: Partial<TAuthor>): Promise<number> {
    return db('authors').where({ id }).update(author);
  }

  static async delete(id: number): Promise<number> {
    return db('authors').where({ id }).del();
  }
}

export default AuthorModel;
