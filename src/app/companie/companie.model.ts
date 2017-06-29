import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Companie {
  _id: string = '';
  name: string = '';
  typeCompanie: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  option: Option = new Option();
  users: User[] = [];
  forms: Form[] = [];
}

export class Option {
  calendar: Calendar = new Calendar();
}
export class Calendar {
  dateBegin: number = 8;
  dateEnd: number = 19;
}

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
