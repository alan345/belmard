import { Form } from '../form/form.model';
export class Project {
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
// export interface Project {
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
