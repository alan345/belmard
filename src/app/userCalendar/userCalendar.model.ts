//import { Form } from '../form/form.model';
import { User } from '../user/user.model';
//import { Quote } from '../quote/quote.model';


export class UserCalendar {
    _id: string = '';
    title: string = '';
    color: Color = new Color();
    resizable: Resizable = new Resizable()
    draggable: boolean = true;
    start: Date = new Date()
    end: Date = new Date()
    meta: Meta = new Meta();
}


export class Color {
  primary: string = '';
  secondary: string = '';
}

export class Resizable {
  beforeStart: boolean = true;
  secondary: boolean = true;
}

export class Meta {
  client: User[] = []
  user: User[] = []
}
