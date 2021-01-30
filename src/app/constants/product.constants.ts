export enum ProductTypes {
  MEMBERSHIP = 'memebership',
}

export enum ProductExpirationFrequencies {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export const ProductTypeOptions = [
  {
    value: ProductTypes.MEMBERSHIP as string,
    displayName: 'Membresía',
  },
];

export const ProductExpirationFrequencyOptions = [
  {
    value: ProductExpirationFrequencies.DAYS,
    displayName: 'Dias',
  },
  {
    value: ProductExpirationFrequencies.WEEKS,
    displayName: 'Semanas',
  },
  {
    value: ProductExpirationFrequencies.MONTHS,
    displayName: 'Meses',
  },
  {
    value: ProductExpirationFrequencies.YEARS,
    displayName: 'Años',
  },
];
