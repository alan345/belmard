import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { ProductSingleComponent }  from '../productSingle.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './productDialog.component.html',
})

export class ProductDialogComponent {
  // @ViewChild(ProductSingleComponent)
  // private productSingleComponent: ProductSingleComponent;

  constructor(public dialogRef: MdDialogRef<ProductSingleComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
