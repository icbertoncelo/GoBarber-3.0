import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 15);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments at the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 15);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 9);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 20, 15);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'user-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 21, 7),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 21, 18),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
