
import { User } from '../user/user.model';


export class Option {
  _id: string = '';
  user: User[] = [];
  calendar: Calendar = new Calendar();

}



export class Calendar {
  timeBegin: number = 0;

}
