import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'submitPicDialog',
  templateUrl: './submitPicDialog.component.html',
})
export class SubmitPicDialog {
  constructor(public dialogRefDelete: MdDialogRef<SubmitPicDialog>) {}

  // deleteSocial(){
  //   console.log("delete")
  // }
}
