import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
