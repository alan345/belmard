import { Component, ViewChild , Inject} from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { EditPaiementQuoteComponent }  from '../editPaiementQuote.component';
import { Quote } from '../../../quote/quote.model'
import { Search } from '../../../shared/shared.model';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './paiementQuoteDialog.component.html',
})

export class PaiementQuoteDialogComponent {
  fetchedQuote: Quote
  search:Search = new Search();

  constructor(
    public dialogRef: MdDialogRef<EditPaiementQuoteComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.search = data.search
  }


  saved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
