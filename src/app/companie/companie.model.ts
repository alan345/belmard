import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Companie {
  _id: string = '';
  nameCompanie: string = '';
  typeCompanie: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  option: Option = new Option();
  users: User[] = [];
  forms: Form[] = [];
  categJson: CategJson = new CategJson();
  categories = new Categorie()
}

export class Categorie {
  categProduct: Categorie0[] = []
  categProject: Categorie0[] = []
}


export class Categorie0 {
  categ: string= '';
  subCateg: Categorie1[] = []
}

export class Categorie1 {
  categ: string= '';
  subCateg: Categorie2[] = []
}

export class Categorie2 {
  categ: string= '';

}

export class CategJson {
  categProduct: string= '';
  categProject: string= '';
}
export class Option {
  calendar: Calendar = new Calendar();
}
export class Calendar {
  timeBegin: number = 8;
  timeEnd: number = 19;
}

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
