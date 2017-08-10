import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { NewUserComponent }  from '../newUser.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './userDialog.component.html',
})

export class UserDialogComponent{
  // @ViewChild(NewUserComponent)
  // private newUserComponent: NewUserComponent;

  constructor(public dialogRef: MdDialogRef<UserDialogComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
