import { ProductTypes } from '../constants/product.constants';

export const getTextForProductType = (type: string): string => {
  switch (type.toLocaleLowerCase()) {
    case ProductTypes.MEMBERSHIP:
      return 'Membresía';
    default:
      return 'type';
  }
};
