import type { Db } from 'mongodb';

import MongoDB from '@database/mongo';

import type { IUser } from '@models/index';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { IAuthUserSignInRepository } from '@controllers/user/auth-sign-in/protocols';

import { replaceMongoId } from '@utils/index';

export class MongoAuthUserSignInRepository implements IAuthUserSignInRepository {
  collection: string = 'user';
  db: Db = MongoDB.getDb();

  async getUserByPhone(userPhone: IUser['phone']): Promise<IUser | null> {
    const user = await this.db
      .collection<TCreateUserParams>(this.collection)
      .findOne({ phone: userPhone });

    return replaceMongoId(user);
  }
}