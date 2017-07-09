import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';
import { Quote } from '../quote/quote.model';


export class PaiementQuote {
  _id: string = '';
  ownerCompanies: Companie[] = []
  quotes: Quote[] = []
  datePaiement: Date = new Date();
  amount: number = 0;
  type: string = '';
  editDateMode: boolean = false;

}
