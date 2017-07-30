import { Component, ViewChild , Inject} from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { EditPaiementQuoteComponent }  from '../editPaiementQuote.component';
import { Quote } from '../../../quote/quote.model'


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './paiementQuoteDialog.component.html',
})

export class PaiementQuoteDialogComponent {
  fetchedQuote: Quote

  //
  // @ViewChild(EditPaiementQuoteComponent)
  // private editPaiementQuoteComponent: EditPaiementQuoteComponent;

  constructor(
    public dialogRef: MdDialogRef<EditPaiementQuoteComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
     this.fetchedQuote = this.data
  }


  newPaiementQuoteSaved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
