// Regra de negocio.

import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id); // Busca o usuario

    // Se nao encontrou o usuario
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Se o arquivo existe
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // Para deletar o arquivo
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user); // Para atualizar os dados do usuario

    return user;
  }
}

export default UpdateUserAvatarService;
