
export const AddressTypes =
  [
    { value: 'billing', label: 'Billing' },
    { value: 'shipping', label: 'Shipping' },
  ]

export class Address {
  nameAddress = 'billing';
  address = '';
  address2 = '';
  city = '';
  cities: string[] = [];
  state = '';
  zip = '';
  country = '';
}
