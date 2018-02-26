import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
// import { Project } from '../project/project.model';


export class UserCalendar {
    _id = '';
    title = '';
    start: Date = new Date();
    end: Date = new Date();
    color = '';
    // description = '';
    // content = '';
    // clients: User[] = [];
    clients: User[] = [];
    assignedTos: User[] = [];
    // projects: Project[] = [];
    isActiveEvent = false;
    // color: Color = new Color();
    draggable = true;
    resizable: Resizable = new Resizable();
    details: Details = new Details();
    // assignedTo: User[] = [];
    // forms: Form[] = [];
    //
    // categorie: Categorie = new Categorie();
    // quotes: Quote[] = [];
}


export class SearchData {
  fetchedUserSearchs: User[] = [];
  // fetchedProjectSearchs: Project[] = [];
  typeUser = ''
}

export class Details {
  description = '';
}
export class Resizable {
  beforeStart = true;
  afterEnd = true;
}


export class Color {
  primary = '';
  secondary = '';
}
