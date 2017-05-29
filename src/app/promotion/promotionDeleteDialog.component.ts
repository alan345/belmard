import { Component} from '@angular/core';
import {  MdDialogRef} from '@angular/material';


@Component({
  selector: 'promotionDeleteDialog',
  templateUrl: './promotionDeleteDialog.component.html',
})
export class PromotionDeleteDialog {
  constructor(public dialogRefDelete: MdDialogRef<PromotionDeleteDialog>) {}

  // deletePromotion(){
  //   console.log("delete")
  // }
}
