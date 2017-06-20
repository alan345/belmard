import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';


export class Quote {
  _id: string = '';
  name: string = '';
  typeQuote: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  _users: User[] = [];
  forms: Form[] = [];
  products: Product[] = [];
  devisDetails: DevisDetails[] = []
  priceQuote: PriceQuote = new PriceQuote()
}

export class PriceQuote {
  priceQuoteWithoutTaxes: number;
  priceQuoteWithTaxes: number;
}


export class DevisDetails {
  productInit: Product = new Product();
  priceWithoutTaxes: number;
  priceWithTaxes: number;
  totalPriceWithoutTaxes: number;
  totalPriceWithTaxes: number;
  vat: number;
  quantity: number;
  discount: number;

}

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
