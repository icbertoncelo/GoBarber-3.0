import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.derectory, user.avatar);
      const userAvatarFileExixts = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExixts) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
