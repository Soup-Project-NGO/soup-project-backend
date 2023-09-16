import type { Db } from 'mongodb';

import type { IUser } from '@models/index';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { HttpResponse, HttpRequest } from '@controllers/protocols';

export const bodyRequiredProps: (keyof IAuthUserSignIn)[] = ['phone', 'password'];

export interface IAuthUserSignIn {
  phone: IUser['phone'];
  password: IUser['password'];
}

export interface IAuthUserSignInController {
  handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>>;
}

export interface IAuthUserSignInRepository {
  collection: string;
  db: Db;
  getUserByPhone(userPhone: IUser['phone']): Promise<IUser | null>;
}