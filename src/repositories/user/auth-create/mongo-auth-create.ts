import type { Db } from 'mongodb';

import MongoDB from '@database/mongo';

import type { IUser } from '@models/index';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { IAuthCreateUserRepository } from '@controllers/user/auth-create/protocols';

import { replaceMongoId } from '@utils/index';

export class MongoAuthCreateUserRepository implements IAuthCreateUserRepository {
  collection: string = 'user';
  db: Db = MongoDB.getDb();

  async createUser(params: TCreateUserParams): Promise<IUser> {
    const { insertedId } = await this.db
      .collection<TCreateUserParams>(this.collection)
      .insertOne(params);

    const user = await this.db
      .collection<TCreateUserParams>(this.collection)
      .findOne({ _id: insertedId });

    if (!user) throw new Error('Unregistered user!');

    return replaceMongoId(user) as IUser;
  }

  async isUserAlreadyRegistered(userPhone: IUser['phone']): Promise<boolean> {
    return !!await this.db
      .collection<TCreateUserParams>(this.collection)
      .findOne({ phone: userPhone });
  }
}