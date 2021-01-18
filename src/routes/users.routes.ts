import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface NewUser {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: NewUser = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default usersRouter;