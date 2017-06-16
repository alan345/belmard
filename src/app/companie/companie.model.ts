import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Companie {
  _id: string = '';
  name: string = '';
  typeCompanie: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  _users: User[] = [];
  forms: Form[] = [];
}
ok

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
