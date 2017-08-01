// import { Form } from '../form/form.model';
// import { User } from '../user/user.model';
// import { Product } from '../product/product.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Expense {
  _id: string = '';
  ownerCompanies: Companie[] = [];
  projects: Project[] = [];
  datePaiement: Date = new Date();
  datePaiementString: string = '';
  amount: number;
  type: string = '';
  editModeDate: boolean = false;

}
