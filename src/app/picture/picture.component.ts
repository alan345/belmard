import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MdDialogRef} from '@angular/material';
// import { ProjectSingleComponent }  from '../projectSingle.component';
import { Form } from '../form/form.model';
import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})

export class PictureComponent {
  @Input() forms: Form[] = [];
  @Output() getPicture: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MdDialog,
  ) {}

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.forms.push(result)
        this.getPicture.emit(result)
      }
    })
  }


}
