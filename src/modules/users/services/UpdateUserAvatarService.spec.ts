import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserVavatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserVavatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update an avatar from a non existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUservatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUservatar.execute({
        user_id: 'non-existent-id',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete an old avatar when updation a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserVavatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserVavatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserVavatar.execute({
      user_id: user.id,
      avatarFileName: 'new-avatar.jpg',
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');
    expect(user.avatar).toBe('new-avatar.jpg');
  });
});
