import type { IUser } from '@models/index';

import type { HttpResponse, HttpRequest } from '@controllers/protocols';

export type TCreateUserParams = Omit<IUser, 'id'>;

export interface IAuthCreateUserController {
  handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>>;
}

export interface IAuthCreateUserRepository {
  createUser(params: TCreateUserParams): Promise<IUser>;
}