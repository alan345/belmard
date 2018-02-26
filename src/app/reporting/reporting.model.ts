import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
// import { Project } from '../project/project.model';


export class PaiementQuoteGraph {
  amountTotal = 0;
  _id: Id = new Id();

}

export class Id {
  month = 0;
  year = 0;
}

export class EmptyRow {
  data= [0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0];
  label= '';
  year= 0;
  ready= false;
}
