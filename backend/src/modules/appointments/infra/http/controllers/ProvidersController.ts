import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import UserMap from '@modules/users/infra/http/mappers/UserMap';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({ user_id });

    const mapperProviders = providers.map(provider => UserMap.toDTO(provider));

    return response.json(mapperProviders);
  }
}