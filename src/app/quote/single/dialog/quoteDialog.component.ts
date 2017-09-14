import { Component, ViewChild,Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { QuoteComponent }  from '../quote.component';
import { Search } from '../../../shared/shared.model';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './quoteDialog.component.html',
})

export class QuoteDialogComponent {
  search: Search= new Search()
  // @ViewChild(QuoteSingleComponent)
  // private quoteSingleComponent: QuoteSingleComponent;

  constructor(
     public dialogRef: MdDialogRef<QuoteComponent>,
     @Inject(MD_DIALOG_DATA) public data: any
   ) {
     this.search = data.search
   }

  saved(data) {
    this.dialogRef.close(data)
  }

}
