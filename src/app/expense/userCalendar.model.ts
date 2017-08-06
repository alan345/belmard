import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';


export class UserCalendar {
    _id: string = '';
    title: string = '';
    start: Date = new Date();
    end: Date = new Date();
    // clients: User[] = [];
    users: User[] = [];
    projects: Project[] = [];
    isActiveEvent: boolean = false;
    color: Color = new Color();
    draggable: boolean = true;
    resizable: Resizable = new Resizable();
    details: Details = new Details();
    // assignedTo: User[] = [];
    // forms: Form[] = [];
    //
    // categorie: Categorie = new Categorie();
    // quotes: Quote[] = [];
}

export class Details {
  description: string = '';
}
export class Resizable {
  beforeStart: boolean = true;
  afterEnd: boolean = true;
}


export class Color {
  primary: string = '';
  secondary: string = '';
}
