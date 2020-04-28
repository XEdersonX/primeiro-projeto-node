import { getRepository } from 'typeorm'; // Se tu nao vai ter um metodo Personalizado tu nao precisa criar Repositorio. Ai tu so importa este metodo typeorm.
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // Promise<void> - quando nao tem nem um retorno    data
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.'); // Service nunca se concta com response.
    }

    const hashedPassword = await hash(password, 8); // Tu passa o salte(string) ou numero(que seria tamanho do salte que vai ser utilizado)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
