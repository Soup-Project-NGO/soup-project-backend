import type { IUser } from '@models/index';

import type { HttpResponse } from '@controllers/protocols';

import type { IGetAllUsersController, IGetAllUsersRepository } from './protocols';

export class GetAllUsersController implements IGetAllUsersController {
  constructor(
    private readonly getAllUsersRepository: IGetAllUsersRepository
  ) { }

  async handle(): Promise<HttpResponse<IUser[]>> {
    try {
      const users = await this.getAllUsersRepository.getAllUsers();

      if (!users.length) return {
        statusCode: 404,
        message: 'Nenhum usuário encontrado!'
      };

      return {
        statusCode: 200,
        body: users,
        message: 'Usuários encontrados!'
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Algo deu errado | ${error}`
      };
    }
  }
}