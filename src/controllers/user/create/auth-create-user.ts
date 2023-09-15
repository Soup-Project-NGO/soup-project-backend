import type { IUser } from '@models/index';

import type { HttpResponse, HttpRequest } from '@controllers/protocols';

import { encryptPassword, isEmptyObject } from '@utils/index';

import type { TCreateUserParams, IAuthCreateUserController, IAuthCreateUserRepository } from './protocols';

export class AuthCreateUserController implements IAuthCreateUserController {
  constructor(
    private readonly authCreateUserRepository: IAuthCreateUserRepository
  ) { }

  async handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>> {
    try {
      if (isEmptyObject(httpRequest.body)) return {
        statusCode: 400,
        message: 'Insira todos os dados do usuário!'
      };

      const isPhoneNumberAlreadyRegistered = await this.authCreateUserRepository.isUserAlreadyRegistered(httpRequest.body.phone);

      if (isPhoneNumberAlreadyRegistered) return {
        statusCode: 409,
        message: 'Número de celular já cadastrado!'
      };

      const body = {
        ...httpRequest.body,
        password: await encryptPassword(httpRequest.body.password)
      };

      const user = await this.authCreateUserRepository.createUser(body);

      return {
        statusCode: 201,
        body: user,
        message: 'Usuário cadastrado com sucesso!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Algo deu errado!'
      };
    }
  }
}