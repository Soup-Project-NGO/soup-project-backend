import MongoDB from '@database/mongo';

import type { IUser } from '@models/index';

import type { HttpResponse, HttpRequest } from '@controllers/protocols';

import { encryptPassword, isEmptyObject } from '@utils/index';

import type { TCreateUserParams, IAuthCreateUserController, IAuthCreateUserRepository } from './protocols';

export class AuthCreateUserController implements IAuthCreateUserController {
  constructor(
    private readonly authCreateUserRepository: IAuthCreateUserRepository
  ) { }

  async handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>> {
    const collection = 'user';

    const db = MongoDB.getDb();

    try {
      if (isEmptyObject(httpRequest.body)) return {
        statusCode: 400,
        message: 'Insira todos os dados do usuário!'
      };

      const isUserAlreadyRegistered = !!await db
        .collection<TCreateUserParams>(collection)
        .findOne({ phone: httpRequest.body.phone });

      if (isUserAlreadyRegistered) return {
        statusCode: 409,
        message: 'Usuário já cadastrado!'
      };

      const body = {
        ...httpRequest.body,
        password: await encryptPassword(httpRequest.body.password)
      };

      const user = await this.authCreateUserRepository.createUser(body);

      return {
        statusCode: 201,
        body: user,
        message: 'Usuário registrado com sucesso!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Algo deu errado!'
      };
    }
  }
}