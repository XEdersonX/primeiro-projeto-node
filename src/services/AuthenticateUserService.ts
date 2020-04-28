import { getRepository } from 'typeorm'; // Se tu nao vai ter um metodo Personalizado tu nao precisa criar Repositorio. Ai tu so importa este metodo typeorm.
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    // Se usuario nao for encontrado. (user === undefined)
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401); // ERRO 401 QUE USUARIO NAO FOI AUTORIZADO
    }

    // user.password - senha criptografada
    // password - senha nao criptografada

    const passwordMatched = await compare(password, user.password);

    // Se a senha tiver incorreta
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // http://www.md5.cz
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
