import type { IUser } from '@models/index';

import type { HttpResponse, HttpRequest } from '@controllers/protocols';

import { bodyValidator, comparePassword } from '@utils/index';

import { bodyRequiredProps, type IAuthUserSignIn, type IAuthUserSignInController, type IAuthUserSignInRepository } from './protocols';

export class AuthUserSignController implements IAuthUserSignInController {
  constructor(
    private readonly authUserSignInRepository: IAuthUserSignInRepository
  ) { }

  async handle(httpRequest: HttpRequest<IAuthUserSignIn>): Promise<HttpResponse<IUser>> {
    try {
      const missingProps = bodyValidator(httpRequest.body, bodyRequiredProps);

      if (!httpRequest.body || missingProps.missingProps.length) return {
        statusCode: 400,
        message: `Campos ausentes: ${missingProps.formattedMissingProps}`
      };

      const user = await this.authUserSignInRepository.getUserByPhone(httpRequest.body.phone);

      if (!user) return {
        statusCode: 404,
        message: 'Usuário não cadastrado!'
      };

      const isPasswordMatching = await comparePassword(httpRequest.body.password, user.password);

      if (!isPasswordMatching) return {
        statusCode: 401,
        message: 'Usuário ou senha incorretos!'
      };

      return {
        statusCode: 200,
        body: user,
        message: 'Usuário autenticado!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Algo deu errado | ${error}`
      };
    }
  }
}