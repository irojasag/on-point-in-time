export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt?: firebase.firestore.Timestamp;
  createdDate?: Date;
  birthDateAt?: firebase.firestore.Timestamp;
  birthDate?: Date;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  locked: boolean;
}
