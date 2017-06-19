import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Quote {
  _id: string = '';
  name: string = '';
  typeQuote: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  _users: User[] = [];
  forms: Form[] = [];
}



export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
