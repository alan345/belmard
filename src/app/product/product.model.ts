
//import { Categorie } from '../video/video.model'


//
// export class ProductClass implements Product  {
//     _id: string = '';
//     relatedProducts: Product[] = [];
//     description : Description = [];
//     categories: Categorie[] = [];
//     categoriesTag: Categorie[] = [];
//     magento: Magento = ;
//     constructor() {}
// }



export class Product {
  _id: string = '';
  relatedProducts: Product[] = [];
  description: Description;
  categories: Categorie[] = [];
  categoriesTag: Categorie[] = [];
  magento: Magento = new Magento();
  constructor(sanitizer: any) {
    this.description = new Description(sanitizer)
  }
}


export class Description {
  benefitsAndResults: string = '';
  howToApply: string = '';
  activeIngredients: string = '';
  title: Title;
  constructor(sanitizer: any) {
    this.title = new Title(sanitizer);
  }

}

export class Title {
  prononciation: string = '';
  embed: string = '';
  embedSecure: {};
  constructor(sanitizer: any) {
    this.embedSecure = sanitizer.bypassSecurityTrustResourceUrl('')
  }
}

export class Categorie {
  name: string;
  type: string;
}


export class Magento {
  id: string = '';
  sku: string= '';
  name: string= '';
  price: number= 0
  weight: string= '';
  custom_attributes: Custom_attribute[] = [];
}



export class Custom_attribute {
  attribute_code: string;
  value: string;
}


export const categPhyto: any = [
    { name:'Conditioners & masks', selected : false },
    { name:'Diateray supplements', selected : false },
    { name:'Leave-in care', selected : false },
    { name:'Relaxers', selected : false },
    { name:'Styling', selected : false },
    { name:'Serums', selected : false },
    { name:'Shampoos', selected : false },
    { name:'Treatments', selected : false },
  ]

export const categPhytoSpecific: any = [
   { name:'Treatments', selected : false },
   { name:'Relaxers', selected : false },
   { name:'Stylers', selected : false },
   { name:'Shampoos & Conditioners', selected : false },
   { name:'Kids', selected : false },
]

export const categSubtil: any = [
    { name:'PERMANENT COLOR', selected : false },
    { name:'DEMI-PERMANENT COLOR', selected : false },
    { name:'TEMPORARY COLOR ENHANCING - DIRECT PIGMENTS', selected : false },
    { name:'BLEACHING', selected : false },
    { name:'AFTER-COLOR SHAMPOO & TECHNICAL', selected : false },
    { name:'OXYDIZERS & DEVELOPER', selected : false },
    { name:'STYLING', selected : false },
]
