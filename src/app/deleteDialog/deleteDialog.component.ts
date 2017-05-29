import { Component} from '@angular/core';

import {  MdDialogRef} from '@angular/material';


@Component({
  selector: 'pressDeleteDialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(public dialogRefDelete: MdDialogRef<DeleteDialog>) {}

  // deletePress(){
  //   console.log("delete")
  // }
}
