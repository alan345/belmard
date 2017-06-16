import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Project {
    _id: string = '';
    name: string = '';
    description: string = '';
    clients: User[] = [];
    assignedTo: User[] = [];
    status: string = '';
    forms: Form[] = [];
}
