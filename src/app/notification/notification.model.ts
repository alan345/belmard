import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';
import { Quote } from '../quote/quote.model';
import { UserCalendar } from '../userCalendar/userCalendar.model';


export class Notification {
  _id: string = '';
  projects: Project[] = []
  quotes: Quote[] = []
  tasks: Task[] = []
  userCalendars: UserCalendar[] = []
  users: User[] = []
  typeObject: string = '';
  nameNotification: string = '';
}
