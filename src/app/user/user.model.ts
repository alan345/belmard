import { Form } from '../form/form.model';
import { Companie } from '../companie/companie.model';


export class User {
  _id: string = '';
  email: string = '';
  lastVisit: Date = new Date;
  role: string[] = [];
  type: string[] = [];
  forms: Form[] = [];
  products: ProductBought[] = [];
  profile: Profile = new Profile();
  notes: Note[] = [];
  password: string = '';
  companies: Companie[] = [];
}

export class ProductBought {
  dateProductAdded: Date = new Date;
//  product: Product;
}



export class Profile {
  name: string = '';
  isFeatured: boolean = false;
  lastName: string = '';
  title: string = '';
  phoneNumber: string = '';
  parentUser: User[] = [];
  _profilePicture: Form[] = [];
  hair: Hair = new Hair();
}

export class Hair {
  hairTexture: string = '';
  hairCondition: string = '';
  scalpCondition: string = '';
}


export interface Note {
    text: string;
    dateNote: Date;
}

export interface Address {
    street: string;
    postcode: string;

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
