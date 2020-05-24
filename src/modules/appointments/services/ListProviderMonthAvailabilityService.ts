import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, endOfDay, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

interface IResponseObject {
  day: number;
  available: boolean;
}

type IResponse = Array<IResponseObject>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month + 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const startAvailableDate = endOfDay(new Date(year, month - 1, day));

      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      const available =
        isAfter(startAvailableDate, new Date()) &&
        appointmentsInDay.length < 10;

      return {
        day,
        available,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
