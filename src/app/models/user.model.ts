export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdAt?: { seconds: number; nanoseconds: number };
  createdDate?: { seconds: number; nanoseconds: number };
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}
