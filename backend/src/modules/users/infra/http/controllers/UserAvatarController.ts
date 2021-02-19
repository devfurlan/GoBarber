import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UserMap from '@modules/users/infra/http/mappers/UserMap';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    const mapperUser = UserMap.toDTO(user);

    return response.json(mapperUser);
  }
}