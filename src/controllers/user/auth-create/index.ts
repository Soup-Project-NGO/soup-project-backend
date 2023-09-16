import type { IUser } from '@models/index';

import type { TCreateUserParams } from '@controllers/user/user.models';
import type { HttpResponse, HttpRequest } from '@controllers/protocols';

import { bodyValidator, encryptPassword } from '@utils/index';

import { bodyRequiredProps, type IAuthCreateUserController, type IAuthCreateUserRepository } from './protocols';

export class AuthCreateUserController implements IAuthCreateUserController {
  constructor(
    private readonly authCreateUserRepository: IAuthCreateUserRepository
  ) { }

  async handle(httpRequest: HttpRequest<TCreateUserParams>): Promise<HttpResponse<IUser>> {
    try {
      const missingProps = bodyValidator(httpRequest.body, bodyRequiredProps);

      if (!httpRequest.body || missingProps.missingProps.length) return {
        statusCode: 400,
        message: `Campos ausentes: ${missingProps.formattedMissingProps}`
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
        message: 'Usuário cadastrado!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Algo deu errado | ${error}`
      };
    }
  }
}