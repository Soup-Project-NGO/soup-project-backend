import { Router, type Request, type Response } from 'express';

import { AuthCreateUserController } from '@controllers/user/create/auth-create-user';

import { MongoAuthCreateUserRepository } from '@repositories/user/create/mongo-auth-create-user';

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

export { router };