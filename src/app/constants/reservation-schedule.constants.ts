export enum ReservationScheduleFrequency {
  WEEKLY = 'weekly',
  // TODO: Add Monthly but need a logic for that too
  // MONTHLY = 'montly',
}

export enum ReservationSchedulePeriod {
  AM = 'AM',
  PM = 'PM',
}

export const ReservationSchedulePeriodOptions = [
  {
    value: ReservationSchedulePeriod.AM,
    displayName: 'AM',
  },
  {
    value: ReservationSchedulePeriod.PM,
    displayName: 'PM',
  },
];

export const ReservationScheduleHoursOptions = [
  {
    value: '1',
    displayName: '1',
  },
  {
    value: '2',
    displayName: '2',
  },
  {
    value: '3',
    displayName: '3',
  },
  {
    value: '4',
    displayName: '4',
  },
  {
    value: '5',
    displayName: '5',
  },
  {
    value: '6',
    displayName: '6',
  },
  {
    value: '7',
    displayName: '7',
  },
  {
    value: '8',
    displayName: '8',
  },
  {
    value: '9',
    displayName: '9',
  },
  {
    value: '10',
    displayName: '10',
  },
  {
    value: '11',
    displayName: '11',
  },
  {
    value: '12',
    displayName: '12',
  },
];
export const ReservationScheduleMinutesOptions = [
  {
    value: '00',
    displayName: '00',
  },
  {
    value: '15',
    displayName: '15',
  },
  {
    value: '30',
    displayName: '30',
  },
  {
    value: '45',
    displayName: '45',
  },
];

export const ReservationScheduleFrequencyOptions = [
  {
    value: ReservationScheduleFrequency.WEEKLY,
    displayName: 'Semanalmente',
  },
];

export const DefaultWeeklyDistribution = [
  {
    day: 0,
    times: [],
  },
  {
    day: 1,
    times: [
      {
        hour: '6:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '10:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '11:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '12:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '1:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '2:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '3:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '4:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '5:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '6:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'PM',
        spaces: 10,
      },
    ],
  },
  {
    day: 2,
    times: [
      {
        hour: '6:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '10:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '11:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '12:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '1:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '2:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '3:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '4:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '5:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '6:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'PM',
        spaces: 10,
      },
    ],
  },
  {
    day: 3,
    times: [
      {
        hour: '6:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '10:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '11:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '12:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '1:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '2:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '3:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '4:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '5:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '6:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'PM',
        spaces: 10,
      },
    ],
  },
  {
    day: 4,
    times: [
      {
        hour: '6:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '10:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '11:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '12:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '1:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '2:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '3:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '4:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '5:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '6:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'PM',
        spaces: 10,
      },
    ],
  },
  {
    day: 5,
    times: [
      {
        hour: '6:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '10:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '11:00',
        period: 'AM',
        spaces: 10,
      },
      {
        hour: '12:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '1:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '2:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '3:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '4:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '5:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '6:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '7:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '8:00',
        period: 'PM',
        spaces: 10,
      },
      {
        hour: '9:00',
        period: 'PM',
        spaces: 10,
      },
    ],
  },
  {
    day: 6,
    times: [],
  },
];
