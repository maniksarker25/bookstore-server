import db from '../db/db';
import { TUser } from '../types/user';

class AuthModel {
  static async create(user: TUser): Promise<number[]> {
    return db('users').insert(user).returning('id');
  }
  static async findByEmail(email: string): Promise<TUser | undefined> {
    return db('users').where({ email }).first();
  }
}

export default AuthModel;
