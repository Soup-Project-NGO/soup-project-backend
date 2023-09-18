import type { Db } from 'mongodb';

import type { IUser } from '@models/index';

import type { HttpResponse } from '@controllers/protocols';

export interface IGetAllUsersController {
  handle(): Promise<HttpResponse<IUser[]>>;
}

export interface IGetAllUsersRepository {
  collection: string;
  db: Db;
  getAllUsers(): Promise<IUser[]>;
}