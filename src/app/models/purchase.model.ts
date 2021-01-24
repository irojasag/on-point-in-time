import { User } from './user.model';
import { Product } from './product.model';
export interface Purchase {
  total: number;
  paymentMethod: string;
  billNumber: number;
  clientId: string;
  products: Product[];
  purchasedAt: firebase.firestore.Timestamp;
  purchasedDate?: Date;
  id: string;
  client: User;
}
