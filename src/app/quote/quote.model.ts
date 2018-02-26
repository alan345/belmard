import { Form } from '../picture/form/form.model';
import { User, UserCross } from '../user/user.model';
import { Product } from '../product/product.model';
// import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';
// import { Drawing } from './single/drawing/drawing.model';
import { DrawingSignature } from './single/drawingSignature/drawingSignature.model';


export class Quote {
  _id = '';
  clients: User[] = [];
  assignedTos: User[] = [];
  historyClients: User[] = [];
  historyClientsCross: UserCross[] = [];
  name = '';
  statusQuote = 'pending';
  // statusQuoteString = '';
  typeQuote = 'quote';
  quoteNumber: number;
  isSigned = false;;
  legalApprovals: string[] = []
  typeIntervention = '';  // _users: User[] = [];
  // ownerQuotes: User[] = [];
  // companieClients: Companie[] = []
  forms: Form[] = [];
  parentQuotes: Quote[] = [];
  products: Product[] = [];
  // projects: Project[] = [];
  devisDetails: DevisDetail[] = []
  priceQuote: PriceQuote = new PriceQuote();
  // signature: Signature = new Signature();
  detail: Detail = new Detail();
  // drawing: Drawing = new Drawing();
  drawingSignature: DrawingSignature = new DrawingSignature();


}

export class Detail {
  currency = '';
  quoteRef = '';
  dateQuote: DateQuote = new DateQuote()
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 30);

export class DateQuote {
  issueDate: Date = new Date();
  // issueDateString = '';
  expiryDate: Date = tomorrow;
  // expiryDateString: string ='';
  dateInvoicePaid: Date = new Date();
  // dateInvoicePaidString: string ='';
}



//
// export class Signature {
//   base64 = '';
//   isSigned = false;
//   dateSignature: Date;
//   users: User[] = [];
// }
export class PriceQuote {
  priceQuoteWithoutTaxes = 0;
  priceQuoteWithTaxes = 0;
  discountGlobal = 0;
  painfulnessGlobal = 0;
  priceGlobalWithDiscount = 0;
  priceGlobalWithTaxesWithDiscount = 0;

  totalPaiementAmount = 0;
  outstandingBalance = 0;
  // priceGlobalWithDiscount = 0;
  vatGlobal = 0;
  priceQuoteTaxes: PriceQuoteTaxe[] = []
}

export class PriceQuoteTaxe {
  VAT = 0;
  TotalVAT = 0;
}

export const ModelVATs: number[] = [0, 5.5, 10]


export class BucketProduct {
  typeRow = '';
  title = '';
  productInit: Product[] = [];
  priceWithoutTaxes = 0;
  priceWithDiscount = 0;
  priceWithQuantityWithDiscount = 0;
  // priceWithQuantityWithDiscount = 0;
  priceWithTaxesWithQuantityWithDiscount = 0;
  // priceWithTaxesWithQuantityWithDiscount = 0;
  priceWithTaxesWithDiscount = 0;
  priceWithTaxes = 0;
  priceWithQuantity = 0;

  priceWithTaxesWithQuantity = 0;
  vat = 0;
  quantity: number = 1;
  length: number = 1;
  width: number = 1;
  surface: number = 1;
  discount = 0;
  isEditMode = false;
}

export class TextToQuote {
    title = '';
    priceWithoutTaxes: number;
  }

export class DevisDetail {
  nameBucketProducts = '';
  bucketProducts: BucketProduct[] = []
}

export const StatusQuotes =
[
  {indexStatus: 'pending', label: 'Pending Approval', icon: 'alarm', color: ''},
  {indexStatus: 'signed', label: 'Signed', icon: 'border_color', color: 'primary'},
  {indexStatus: 'paid', label: 'Paid', icon: 'attach_money', color: 'accent'},
  {indexStatus: 'rejected', label: 'Rejected', icon: 'face', color: 'warn'},
  // {indexStatus: 3, label: 'Signed, pending paiement'},
  // {indexStatus: 4, label: 'Done'},
]
// export const StatusQuotesInvoice =
// [
//   {indexStatus: 'sent', label: 'Sent'},
//   {indexStatus: 'paid', label: 'Paid'},
// ]

// export class Address {
//   address = '';
//   city = '';
//   state = '';
//   zip = '';
// }
