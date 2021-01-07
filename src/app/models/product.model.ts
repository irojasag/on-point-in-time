export interface Product {
  id: string;
  type: string;
  name: string;
  price: number;
  isPublic: boolean;
  expirationAmunt: number;
  expirationFrequency: string;
  categories: string[];
  needsReservationsPerWeek: boolean;
  reservationsPerWeek: number;
  needsPackages: boolean;
  packages: number;
}
