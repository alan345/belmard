import { Component, Input } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { ProjectSingleComponent }  from '../projectSingle.component';
import { Log} from '../../project.model';
import { AuthService} from '../../../auth/auth.service';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})

export class CommentComponent {
  @Input() logs: Log[] = [];
  newLog = new Log()
  constructor(private authService: AuthService) {}

  newComment(comment: string) {
    this.newLog.comment = comment
    this.newLog.by = [this.authService.getCurrentUser()]
    this.logs.unshift(this.newLog)
    this.newLog = new Log()
  }
  getPicture(picture) {
    this.newLog.forms.push(picture)
  }

}
