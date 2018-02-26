import { User } from '../user/user.model';
import { Companie } from '../companie/companie.model';
import { Quote } from '../quote/quote.model';
// import { Form } from '../picture/form/form.model';
// import { Product } from '../product/product.model';
// import { Project } from '../project/project.model';


export class PaiementQuote {
  _id = '';
  ownerCompanies: Companie[] = []
  quotes: Quote[] = []
  createdBy: User[] = []
  userDebiteds: User[] = []
  // projects: Project[] = []
  datePaiement: Date = new Date();
  datePaiementString = '';
  amount = 0;
  type = 'cash';
  currency = '';
  title = '';
  isGooplusPaiement = false;
  isPaid = true;
  isExpense = false;
  editModeDate = false;
  stripe: Stripe = new Stripe()
}
export class Stripe {
  cusId = '';
  isSubscription = false;
  charge: Charge = new Charge()
}
export class Charge {
  balance_transaction = '';
  amount: number;
  created: number
  currency = '';
  customer = '';
  id = '';
  status = '';
  source: Source = new Source()
}

export class Source {
  address_city = '';
  address_country = '';
  address_line1 = '';
  address_line1_check = '';
  address_line2 = '';
  address_state = '';
  address_zip = '';
  address_zip_check = '';
  brand = '';
  country = '';
  customer = '';
  cvc_check = '';
  dynamic_last4 = '';
  exp_month = '';
  exp_year = '';
  fingerprint = '';
  funding = '';
  id = '';
  last4 = '';
}


// stripe: {
//   charge:{
//     balance_transaction = '';
//     amount: {type: Number},
//     created: {type: Number},
//     currency = '';
//     customer = '';
//     id = '';
//     status = '';
//     source: {
//       address_city = '';
//       address_country = '';
//       address_line1 = '';
//       address_line1_check = '';
//       address_line2   = '';
//       address_state = '';
//       address_zip = '';
//       address_zip_check = '';
//       brand = '';
//       country = '';
//       customer   = '';
//       cvc_check   = '';
//       dynamic_last4 = '';
//       exp_month   = '';
//       exp_year = '';
//       fingerprint   = '';
//       funding = '';
//       id = '';
//       last4 = '';
//     }
//
//   },
//   cusId = '';
//   isSubscription:{type: Boolean, default: [false]},
//   planDetail:{
//     plan:{type: String, default: ['']},
//     current_period_end:{type: Date}
//   }
// }

export class StripeCustomer {
  id = '';
  account_balance = 0;
  created = '';
  default_source = '';
  description = '';
  email = '';
  sources: Sources = new Sources()
  subscriptions: Subscription = new Subscription()
}

export class Sources {
  data: DataSource[] = []
}

export class DataSource {
  id = '';
  object = 'card';
  address_city = '';
  address_country = '';
  address_line1 = '';
  address_state = '';
  address_zip = '';
  address_line2 = '';
  brand = '';
  country = '';
  exp_month = '';
  exp_year = '';
  last4 = '';
  funding = '';
  cvc = '';
}

export class Subscription {
  data: DataSubscription[] = []
}

export class DataSubscription {
  id = '';
  created = '';
  current_period_end = '';
  current_period_start = '';
  items: Items = new Items()
}


export class Items {
  data: DataItem[] = []
}

export class DataItem {
  id = '';
  created = '';
  plan: Plan = new Plan()
}

export class Plan {
  id = '';
  amount = 0;
  created = '';
  currency = '';
  interval = '';
  interval_count = 0;
}

export const PaiementsTypes = [
  { label: 'Check', value: 'check' },
  { label: 'Cash', value: 'cash' },
]
