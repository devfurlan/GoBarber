import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

interface IAuthenticateUser {
  user: {
    email: string;
    password?: string;
  };
  token: string;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token }: IAuthenticateUser = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  }
}
