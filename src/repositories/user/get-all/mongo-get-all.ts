import type { Db } from 'mongodb';

import MongoDB from '@database/mongo';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { IGetAllUsersRepository } from '@controllers/user/get-all/protocols';

export class MongoGetAllUsersRepository implements IGetAllUsersRepository {
  collection: string = 'user';
  db: Db = MongoDB.getDb();

  async getAllUsers() {
    const users = await this.db
      .collection<TCreateUserParams>(this.collection)
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest
    }));
  }
}