export enum ReservationScheduleFrequency {
  WEEKLY = 'weekly',
  // TODO: Add Monthly but need a logic for that too
  // MONTHLY = 'montly',
}

export const ReservationScheduleFrequencyOptions = [
  {
    value: ReservationScheduleFrequency.WEEKLY,
    displayName: 'Semanalmente',
  },
];
