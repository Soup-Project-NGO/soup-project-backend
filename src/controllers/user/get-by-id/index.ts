import type { IUser } from '@models/user';

import type { HttpRequest, HttpResponse } from '@controllers/protocols';

import type { IGetUserByIdController, IGetUserByIdRepository } from './protocols';

export class GetUserByIdController implements IGetUserByIdController {
  constructor(
    private getUserByIdRepository: IGetUserByIdRepository
  ) { }

  async handle(httpRequest: HttpRequest<null, { userId: IUser['id'] }>): Promise<HttpResponse<IUser>> {
    try {
      if (!httpRequest.params?.userId) return {
        statusCode: 400,
        message: 'Parâmetro :userId ausente na solicitação!'
      };

      const user = await this.getUserByIdRepository.getUserById(httpRequest.params.userId);

      if (!user) return {
        statusCode: 404,
        message: 'Usuário não encontrado!'
      };

      return {
        statusCode: 200,
        body: user,
        message: 'Usuário encontrado!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Algo deu errado | ${error}`
      };
    }
  }
}