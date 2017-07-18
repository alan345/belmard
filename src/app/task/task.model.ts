import { Form } from '../form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Project } from '../project/project.model';




export class Task {
    _id: string = '';
    projects: Project[] = []
    bucketTasks: BucketTasks[] = []
}


export class BucketTasks {
  bucketName: string = '';
  openNewTask: boolean = false;
  taskDetails: TaskDetail[] = []
}


export class TaskDetail {
  name: string = '';
  editMode: boolean = false;
  description: string = '';
  assignedTos: User[] = [];
}
