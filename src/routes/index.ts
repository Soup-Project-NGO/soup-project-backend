import { Router, type Request, type Response } from 'express';

import type { IUser } from '@models/user';

import { AuthCreateUserController } from '@controllers/user/auth-create';
import { MongoAuthCreateUserRepository } from '@repositories/user/auth-create/mongo-auth-create';

import { AuthUserSignController } from '@controllers/user/auth-sign-in';
import { MongoAuthUserSignInRepository } from '@repositories/user/auth-sign-in/mongo-auth-sign-in';

import { GetAllUsersController } from '@controllers/user/get-all';
import { MongoGetAllUsersRepository } from '@repositories/user/get-all/mongo-get-all';

import { GetUserByIdController } from '@controllers/user/get-by-id';
import { MongoGetUserByIdRepository } from '@repositories/user/get-by-id/mongo-get-by-id';

const router = Router();

const baseRoute = '/api/v1/';

router.post(`${baseRoute}auth/user/create`, async (req: Request, res: Response) => {
  const mongoAuthCreateUserRepository = new MongoAuthCreateUserRepository();

  const authCreateUserController = new AuthCreateUserController(mongoAuthCreateUserRepository);

  const { statusCode, body, message } = await authCreateUserController.handle({
    body: req.body
  });

  res.status(statusCode).json({ body, message });
});

router.get(`${baseRoute}auth/user/sign-in`, async (req: Request, res: Response) => {
  const mongoAuthUserSignInRepository = new MongoAuthUserSignInRepository();

  const authUserSignController = new AuthUserSignController(mongoAuthUserSignInRepository);

  const { statusCode, body, message } = await authUserSignController.handle({
    body: req.body
  });

  res.status(statusCode).json({ body, message });
});

router.get(`${baseRoute}user/get-all`, async (req: Request, res: Response) => {
  const mongoGetAllUsersRepository = new MongoGetAllUsersRepository();

  const getAllUsersController = new GetAllUsersController(mongoGetAllUsersRepository);

  const { statusCode, message, body } = await getAllUsersController.handle();

  res.status(statusCode).json({ body, message });
});

router.get(`${baseRoute}user/get-by-id/:userId`, async (req: Request<{ userId: IUser['id'] }>, res: Response) => {
  const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();

  const getUserByIdController = new GetUserByIdController(mongoGetUserByIdRepository);

  const { statusCode, body, message } = await getUserByIdController.handle({
    params: { userId: req.params.userId }
  });

  res.status(statusCode).json({ body, message });
});

export { router };