import { Component } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { Form } from '../form/form.model';


@Component({
  selector: 'pressDeleteDialog',
  templateUrl: './seePictureDialog.component.html',
})
export class SeePictureDialogComponent {
  form: Form;
  constructor(public dialogRefDelete: MdDialogRef<SeePictureDialogComponent>) {}

  // deletePress(){
  //   console.log("delete")
  // }
}
