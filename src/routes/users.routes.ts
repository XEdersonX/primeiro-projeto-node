import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Repositorios
 * Services
 */

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(); // Instanciar CreateUserService;

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password; // Deleta informacao da senha para nao ser exibida no json.

    // return response.send(user);
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Para atualizar uma unica informacao do usuario    avatar é o nome do campo
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // console.log(request.file);

    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password; // Deletar password que vai na resposta do json

      // return response.json({ ok: true });
      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
