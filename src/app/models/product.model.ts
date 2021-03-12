export interface Product {
  id: string;
  type: string;
  name: string;
  price: number;
  isPublic: boolean;
  expirationAmunt: number;
  expirationFrequency: string;
  categories: string[];
  reservationsPerDay: number;
  reservationsPerWeek: number;
  maxReservations: number;
  needsPackages: boolean;
  packages: number;
  createdAt?: firebase.firestore.Timestamp;
  createdDate?: Date;
  startDate: firebase.firestore.Timestamp;
  startDateDisplay?: Date;
  expirationDate: firebase.firestore.Timestamp;
  expirationDateDisplay?: Date;
  isExpired?: boolean;
  dayDiffence?: number;
}
