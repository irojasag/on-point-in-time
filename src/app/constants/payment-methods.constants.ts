export enum PaymentMethods {
  CASH = 'cash',
  WIRE_TRANSFER = 'wire_transfer',
  OTHER = 'other',
}

export const PaymentMethodOptions = [
  {
    value: PaymentMethods.CASH,
    displayName: 'Efectivo',
  },
  {
    value: PaymentMethods.WIRE_TRANSFER,
    displayName: 'Transferencia',
  },
  {
    value: PaymentMethods.OTHER,
    displayName: 'Otro',
  },
];
