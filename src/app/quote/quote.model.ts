import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Project } from '../project/project.model';


export class Quote {
  _id: string = '';
  clients: User[] = [];
  name: string = '';
  typeQuote: string = '';
  _users: User[] = [];
  forms: Form[] = [];
  products: Product[] = [];
  projects: Project[] = [];
  devisDetails: DevisDetails[] = []
  priceQuote: PriceQuote = new PriceQuote()
  signature: Signature=new Signature()
  paiements: Paiement[] = []
}


export class Paiement {
  type: string = '';
  amount: number= 0;
  datePaiement: Date = new Date();
  editDateMode : boolean = false
}

export class Signature {
  base64: string = '';
  dateSignature: Date;
}
export class PriceQuote {
  priceQuoteWithoutTaxes: number = 0;
  priceQuoteWithTaxes: number = 0;
  paiementQuote: number = 0;
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

// export class Address {
//   address: string = '';
//   city: string = '';
//   state: string = '';
//   zip: string = '';
// }
