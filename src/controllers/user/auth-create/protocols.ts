import type { Db } from 'mongodb';

import type { IUser } from '@models/index';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { HttpResponse, HttpRequest } from '@controllers/protocols';

export interface IAuthCreateUserController {
  handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>>;
}

export interface IAuthCreateUserRepository {
  collection: string;
  db: Db;
  createUser(params: TCreateUserParams): Promise<IUser>;
  isUserAlreadyRegistered(userPhone: IUser['phone']): Promise<boolean>;
}