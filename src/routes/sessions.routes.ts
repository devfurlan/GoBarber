import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface NewAuthenticateUser {
  user: {
    email: string;
    password?: string;
  };
  token: string;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token }: NewAuthenticateUser = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default sessionsRouter;