import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
