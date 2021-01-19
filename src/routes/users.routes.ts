import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UploadUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface User {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: User = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  try {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user: User = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default usersRouter;