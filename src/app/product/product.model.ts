import { Form } from '../form/form.model';
import { Companie } from '../companie/companie.model';
import { User } from '../user/user.model';

export class Product {
    _id: string = '';
    details: Details = new Details();
    referenceName: string = '';
    reference: string = '';
    forms: Form[] = [];
    categorie: Categorie = new Categorie();
    owner: User[] = [];
    vendors: Companie[] = [];
}

export class Details {
  referenceName: string = '';
  reference: string = '';
  price: Price = new Price();
  description: string = '';
  dimension: Dimension = new Dimension();
  stock: Stock = new Stock();
}

export class Categorie {
  categ1: Categ[] = [];
  categ2: Categ[] = [];
  categ3: Categ[] = [];
}


export class Categ {
  name: string = '';
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

export const ProductSteps =
[
  {
    'categ':'Serrurerie',
    'subCateg': [
      {
        'categ':'Serrurerie de bâtiment',
        'subCateg': [
          {categ: 'Clés'},
          {categ: 'Cylindres'},
          {categ:'Verrous'}
        ]
      },
      {
        'categ':'Ferme-portes',
        'subCateg': [
          {categ: 'Ferme-portes contemporains'},
          {categ: 'Ferme-portes technologies à came'},
          {categ: 'Ferme-portes technologies pignons à crémaillère'}
        ]
      },
    ]
  },
  {
    'categ':'Menuiserie',
    'subCateg': [
      {
        'categ':'Portes',
        'subCateg': [
          {categ: 'Fenêtres bois ou PVC'},
          {categ: 'Portes et portes fenêtres'},
          {categ: 'Coulissants bois ou PVC'},
        ]
      }
    ]
  }
]
