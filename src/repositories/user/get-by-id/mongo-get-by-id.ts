import { ObjectId, type Db } from 'mongodb';

import MongoDB from '@database/mongo';

import type { IUser } from '@models/user';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { IGetUserByIdRepository } from '@controllers/user/get-by-id/protocols';

import { removeIdUnderline } from '@utils/index';

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
  collection: string = 'user';
  db: Db = MongoDB.getDb();

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await this.db
      .collection<TCreateUserParams>(this.collection)
      .findOne({ _id: ObjectId.createFromHexString(userId) });

    return removeIdUnderline(user);
  }
}