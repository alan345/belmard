import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Project } from '../project/project.model';


export class Task {
    _id: string = '';
    projects: Project[] = []
    name: string = '';
    editMode: boolean = false;
    description: string = '';
    status: string = '';
    assignedTos: User[] = [];
    dateTask: DateTask = new DateTask()
}
export class DateTask {
  creationDate: Date = new Date()
  creationDateString: string = '';
  endDate: Date = new Date()
  endDateString: string = '';
}
