export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt?: { seconds: number; nanoseconds: number };
  createdDate?: Date;
  birthDateAt?: { seconds: number; nanoseconds: number };
  birthDate?: Date;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}
