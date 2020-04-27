import { getRepository } from 'typeorm'; // Se tu nao vai ter um metodo Personalizado tu nao precisa criar Repositorio. Ai tu so importa este metodo typeorm.
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    // Se usuario nao for encontrado. (user === undefined)
    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password - senha criptografada
    // password - senha nao criptografada

    const passwordMatched = await compare(password, user.password);

    // Se a senha tiver incorreta
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuario Autenticado
    return {
      user,
    };
  }
}

export default AuthenticateUserService;
