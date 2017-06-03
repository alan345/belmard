import { Form } from '../form/form.model';
export class Product {
    _id: string = '';
    title: string = '';
    embed: string = '';
    forms: Form[] = [];
    embedSecure : string;
    categories:Categorie[] = [];
    owner: Owner[] = [];
    constructor() {
      
    }
}


//
// export interface Product {
//   _id: string;
//   title: string;
//   embed: string;
//   embedSecure: {};
//   categories:Categorie[];
//   owner: Owner[];
// }



export class Categorie {
  name: string= '';
  type: string= '';
}
export interface Owner {
  _id: string;
}
