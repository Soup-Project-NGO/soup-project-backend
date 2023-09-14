import MongoDB from '@database/mongo';

import type { IUser } from '@models/index';

import type { TCreateUserParams, IAuthCreateUserRepository } from '@controllers/user/create/protocols';

import { removeIdUnderline } from '@utils/index';

export class MongoAuthCreateUserRepository implements IAuthCreateUserRepository {
  async createUser(params: TCreateUserParams): Promise<IUser> {
    const collection = 'user';

    const db = MongoDB.getDb();

    const { insertedId } = await db
      .collection<TCreateUserParams>(collection)
      .insertOne(params);

    const user = await db.
      collection<TCreateUserParams>(collection)
      .findOne({ _id: insertedId });

    if (!user) throw new Error('Unregistered user!');

    return removeIdUnderline(user);
  }
}