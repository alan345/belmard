import { Component } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { ProjectSingleComponent }  from '../projectSingle.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './projectDialog.component.html',
})

export class ProjectDialogComponent {
  // @ViewChild(ProjectSingleComponent)
  // private projectSingleComponent: ProjectSingleComponent;

  constructor(public dialogRef: MdDialogRef<ProjectSingleComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
