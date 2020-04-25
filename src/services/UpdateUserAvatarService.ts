interface Request {
  avatar_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ avatar_id, avatarFileName }: Request): Promise<void> {}
}

export default UpdateUserAvatarService;
