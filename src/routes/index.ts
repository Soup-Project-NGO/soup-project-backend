import { Router, type Request, type Response } from 'express';

import type { IUser } from '@models/user';

import { AuthCreateUserController } from '@controllers/user/auth-create';
import { MongoAuthCreateUserRepository } from '@repositories/user/auth-create/mongo-auth-create';

import { GetUserByIdController } from '@controllers/user/get-by-id';
import { MongoGetUserByIdRepository } from '@repositories/user/get-by-id/mongo-get-by-id';

const router = Router();

const baseRoute = '/api/v1/';

router.post(`${baseRoute}auth/user`, async (req: Request, res: Response) => {
  const mongoAuthCreateUserRepository = new MongoAuthCreateUserRepository();

  const authCreateUserController = new AuthCreateUserController(mongoAuthCreateUserRepository);

  const { statusCode, body, message } = await authCreateUserController.handle({
    body: req.body
  });

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