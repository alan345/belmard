import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { ListNewObjComponent }  from '../listNewObj.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './listNewObjDialog.component.html',
})

export class ListNewObjDialogComponent {
  // @ViewChild(ProductSingleComponent)
  // private productSingleComponent: ProductSingleComponent;

  constructor(public dialogRef: MdDialogRef<ListNewObjComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
