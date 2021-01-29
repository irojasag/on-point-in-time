import { ReservationScheduleFrequency } from '../constants/reservation-schedule.constants';

export const getDistributionName = (day: number, frequency: string): string => {
  switch (day) {
    case 0:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Domingo';
      }
      break;

    case 1:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Lunes';
      }
      break;

    case 2:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Martes';
      }
      break;

    case 3:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Miércoles';
      }
      break;

    case 4:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Jueves';
      }
      break;

    case 5:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Viernes';
      }
      break;

    case 6:
      if (frequency === ReservationScheduleFrequency.WEEKLY) {
        return 'Sábado';
      }
      break;
    default:
      return '';
  }
};

export const getDaySchedule = (times: any[]): string => {
  if (times.length) {
    return `${times[0].hour} ${times[0].period} - ${
      times[times.length - 1].hour
    } ${times[times.length - 1].period} | `;
  }
  return '';
};
