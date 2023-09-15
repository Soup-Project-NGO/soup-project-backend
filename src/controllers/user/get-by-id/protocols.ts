import type { Db } from 'mongodb';

import type { IUser } from '@models/index';

import type { HttpResponse, HttpRequest } from '@controllers/protocols';

export interface IGetUserByIdController {
  handle(httpRequest: HttpRequest<null, { userId: IUser['id'] }>): Promise<HttpResponse<IUser>>;
}

export interface IGetUserByIdRepository {
  collection: string;
  db: Db;
  getUserById(userId: IUser['id']): Promise<IUser | null>;
}