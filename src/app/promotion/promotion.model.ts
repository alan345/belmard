import { Form } from '../form/form.model';
import { User } from '../user/user.model';


export class Promotion {
    _id: string = '';
    date: DatePromo = new DatePromoClass();
    name: string = '';
    form: Form[] = [];
    owner: User[] = [];
    constructor() {
    }
}
export class DatePromoClass {
  dateBegin: string = new Date().toISOString().substr(0, 10);
  dateEnd: string = new Date().toISOString().substr(0, 10);
}

// export interface Promotion {
//   _id: string;
//   date: DatePromo;
//   name: string;
//   form: Form[];
// }


export interface DatePromo {
  dateBegin: string;
  dateEnd: string;
}

// export const PromotionConst: Promotion = {
//   _id: '',
//   date: {
//     dateBegin: new Date().toISOString().substr(0, 10),
//     dateEnd: new Date().toISOString().substr(0, 10),
//   },
//   name: '',
//   form: []
// };
