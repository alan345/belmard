import { Form } from '../form/form.model';
import { Companie } from '../companie/companie.model';

export const TypeUser = ['plombier', 'serrurier']

export class User {
  _id: string = '';
  email: string = '';
  role: string[] = [];
  type: string[] = [];
  forms: Form[] = [];
  profile: Profile = new Profile();
  password: string = '';
  companies: Companie[] = [];
  salesMan: User[] = [];
  paiement: Paiement= new Paiement()
}

export class Paiement{
  stripe: Stripe = new Stripe()
}
export class Stripe {
  current_period_end: Date= new Date()
}

export class Profile {
  name: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  otherData: string = '';
  parentUser: User[] = [];
  _profilePicture: Form[] = [];
  colorCalendar: string = '';
  fax: string = '';
  title: string = '';
  typeClient: string = '';
  statusHouse: string = '';
  detailHouse: DetailHouse = new DetailHouse();
  address: Address = new Address();
  language: string = '';
}




export class DetailHouse {
  typeHouse: string = '';
  surface: number = 0;
  accesCode: string = '';
  floor: string = '';
  accessType: string = '';
}




export class Address {
    address : string = '';
    city : string = '';
    state : string = '';
    zip : string = '';
}


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
