import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { UserFormsComponent }  from '../userForms.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './editOptionsDialog.component.html',
})

export class EditOptionsComponentDialog {
  @ViewChild(UserFormsComponent)
  private userFormsComponent: UserFormsComponent;

  constructor(public dialogRef: MdDialogRef<EditOptionsComponentDialog>) {}


  onUploadFinisedChildToParent() {
    this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
