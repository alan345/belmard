import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
// import { Address } from '../user/address/address.model';
import {Address} from '../shared/address/address.model';

export class Companie {
  _id = '';
  nameCompanie = '';
  // typeCompanie = '';
  isSupplier = false;
  phoneNumber = '';
  faxNumber = '';
  email = '';
  VAT = '';
  modelVATs: number[] = [];
  legalApprovals: string[] = [];
  typeInterventions: string[] = [];
  address: Address[] = [];
  option: Option = new Option();
  users: User[] = [];
  forms: Form[] = [];
  // categJson: CategJson = new CategJson();
  quoteSettings: QuoteSettings = new QuoteSettings
  categories = new Categorie()
  typeUsers: TypeUsers[] = []
  planDetail = new PlanDetail()
  rights: Rigth[] = [];
  banck: Banck = new Banck()
  // contactsPerson: ContactsPerson[] = []
}


export class QuoteSettings {
  legalNotice = '';
  legalNoticeInvoice = '';
  prefixInvoice = '';
  prefixQuote = '';
  prefixIntervention = '';
}
// export class ContactsPerson {
//   contactType = '';
//   contactName = '';
//   contactFirstName = '';
//   contactPhoneNumber = '';
//   contactEmail = '';
// }


export class TypeUsers {
  value = '';
}

export class Banck {
  serviceSelected = '';
  stripe: Stripe = new Stripe();
}
export class Stripe {
  stripe_user_id = '';
  stripe_user_id_gooplus = '';
}

export class Rigth {
  nameRight = '';
  permissions: Permission[] = [];
}

export class Permission {
  namePermission = '';
  access: Access[] = [];
}



export class Access {
  typeAccess = '';
}

export class PlanDetail {
  current_period_end: Date;
  plan = '';
}

export class Categorie {
  categProduct: Categorie0[] = []
  categProject: Categorie0[] = []
}


export class Categorie0 {
  categ = '';
  isFlagged = false;
  subCateg: Categorie1[] = []
}

export class Categorie1 {
  categ = '';
  subCateg: Categorie2[] = []
}

export class Categorie2 {
  categ = '';

}

// export class CategJson {
//   categProduct = '';
//   categProject = '';
// }
export class Option {
  calendar: Calendar = new Calendar();
  currency = '€';
}

export class Calendar {
  timeBegin = '06:00:00';
  timeEnd = '19:00:00';
  slotDuration = '00:30:00';

  timeBeginbusinessHours = '10:00:00';
  timeEndbusinessHours = '17:00:00';
  daysToHide: number[] = [];
}
//
// export class Address {
//   nameAddress = '';
//   address = '';
//   city = '';
//   state = '';
//   zip = '';
//   country = '';
//
// }
