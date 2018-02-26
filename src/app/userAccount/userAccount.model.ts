import { Form } from '../picture/form/form.model';
import { Companie } from '../companie/companie.model';
import { Right } from '../right/right.model';
import { Address } from '../shared/address/address.model';


export class UserRegister {

  email = '';

  profile: Profile = new Profile();
  password = '';
  company: CompanyRegister = new CompanyRegister()

}

export class CompanyRegister {
  nameCompanie = '';
  typeCompanie = '';
}


export class Paiement{
  stripe: Stripe = new Stripe()
}
export class Stripe {
  current_period_end: Date= new Date()
}


export class Profile {
  name = '';
  lastName = '';
  phoneNumber = '';
  otherData = '';
  companyName = '';

  // parentUser: User[] = [];
  profilePicture: Form[] = [];
  colorCalendar = '';
  // fax = '';
  title = 'Mr.';
  typeClient = 'Individual';
  // statusHouse = '';
  // sourceContact = '';
  // detailHouse: DetailHouse = new DetailHouse();
  address: Address[] = [];
  language = 'fr';
}




// export class DetailHouse {
//   typeHouse = '';
//   surface: number;
//   accesCode = '';
//   floor = '';
//   accessType = '';
// }


//
// export const AddressTypes =
// [
//   {value: 'shipping', label: 'Shipping'},
//   {value: 'billing', label: 'Billing'},
// ]
//
//
// export class Address {
//     nameAddress = 'shipping';
//     address = '';
//     address2 = '';
//     city = '';
//     cities: string[] = [];
//     state  = '';
//     zip  = '';
//     country  = '';
// }


export class UserProfile {
  constructor(public email: string,
              public role: Array<any>,
              public createdAt: string,
              public updatedAt: string,
              public id: string,
              public profilePic: string,
            ) {
  }
}
export class newPassword {
  constructor(public currentPassword: string, public newPassword: string) {
  }
}
