import { User } from './user.model';
export interface Reservation {
  id: string;
  reservationScheduleId: string;
  date: firebase.firestore.Timestamp;
  dateToDisplay: Date;
  time: string;
  hour: string;
  spaces: number;
  period: string;
  userId: string;
  user?: User;
}
