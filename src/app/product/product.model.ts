import { Form } from '../form/form.model';
import { Companie } from '../companie/companie.model';
import { User } from '../user/user.model';

export class Product {
    _id: string = '';
    details: Details = new Details();
    referenceName: string = '';
    reference: string = '';
    forms: Form[] = [];
    categorie: Categorie[] = [];
    owner: User[] = [];
    vendor: Companie[] = [];
}

export class Categorie {
  categ1: Categ[] = [];
  categ2: Categ[] = [];
  categ3: Categ[] = [];
}


export class Categ {
  categ1: CategDetail[] = [];
  categ2: CategDetail[] = [];
  categ3: CategDetail[] = [];
}

export class CategDetail {
  name: string = '';
}

export class Details {
  referenceName: string = '';
  reference: string = '';
  price: Price = new Price();
  description: string = '';
  dimension: Dimension = new Dimension();
  stock: Stock = new Stock();
}

export class Price {
  costPrice: number = 0;
  sellingPrice: number = 0;
}
export class Dimension {
  height: number = 0;
  width: number = 0;
  depth: number = 0;
}
export class Stock {
  quantity: number = 0;
}
