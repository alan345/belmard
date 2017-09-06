import { Component, ViewChild } from '@angular/core';
import { MdDialogRef} from '@angular/material';
// import { ListNewObjComponent }  from '../listNewObj.component';
import { AuthService} from '../../../../auth/auth.service';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './listNewObjDialog.component.html',
  styleUrls: ['../../navbar.component.css']
})

export class ListNewObjDialogComponent {
  // @ViewChild(ProductSingleComponent)
  // private productSingleComponent: ProductSingleComponent;

  constructor(
    private authService: AuthService,
  ) {}

  saved(data) {
    // this.dialogRef.close(data)
  }

}
