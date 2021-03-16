import * as firebase from 'firebase/app';
export interface CalendarNote {
  id: string;
  reservationScheduleId: string;
  date: firebase.firestore.Timestamp;
  dateToDisplay: Date;
  time: string;
  hour: string;
  period: string;
  content: string;
}
