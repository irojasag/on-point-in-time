export interface ReservationSchedule {
  id: string;
  displayName: string;
  frequency: string;
  frequencyDisplayName: string;
  showPhotos: boolean;
  distribution: ReservationScheduleDistribution[];
  weight: number;
  disabled: boolean;
}

export interface ReservationScheduleDistribution {
  day: number;
  times: ReservationScheduleTime[];
  displayName: string;
  frequency: string;
}

export interface ReservationScheduleTime {
  hour: string;
  spaces: number;
  period: string;
  time?: string;
  customName?: string;
}
