import { Component, Input } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { ProjectSingleComponent }  from '../projectSingle.component';
import { Log} from '../../project.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})

export class CommentComponent {
  @Input() logs: Log[] = [];

  constructor() {}

  newComment(comment: string) {
    let newLog = new Log()
    newLog.comment = comment
    this.logs.push(newLog)
  }


}
