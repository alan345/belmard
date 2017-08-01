import { Component, ViewChild , Inject} from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { ExpenseComponent }  from '../expense.component';
import { Quote } from '../../../quote/quote.model'


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './expenseDialog.component.html',
})

export class ExpenseDialogComponent {
  fetchedQuote: Quote

  //
  // @ViewChild(EditExpenseComponent)
  // private editExpenseComponent: EditExpenseComponent;

  constructor(
    public dialogRef: MdDialogRef<ExpenseComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
     this.fetchedQuote = this.data
  }


  newExpenseSaved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
