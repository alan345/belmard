import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { NotificationComponent }  from '../notification.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './notificationDialog.component.html',
})

export class NotificationDialogComponent {
  // @ViewChild(NotificationSingleComponent)
  // private notificationSingleComponent: NotificationSingleComponent;

  constructor(public dialogRef: MdDialogRef<NotificationComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
