import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Project {
    _id: string = '';
    name: string = '';
    status: number = 0;
    description: string = '';
    clients: User[] = [];
    assignedTo: User[] = [];
    forms: Form[] = [];
}
