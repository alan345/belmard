import { Component, ViewChild , Inject} from '@angular/core';
import { MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { ExpenseComponent }  from '../expense.component';
import { Quote } from '../../../quote/quote.model'
import { UserCalendar } from '../../userCalendar.model';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './expenseDialog.component.html',
})

export class ExpenseDialogComponent {
  // fetchedQuote: Quote
  fetchedUserCalendar: UserCalendar = new UserCalendar()
  //
  // @ViewChild(EditExpenseComponent)
  // private editExpenseComponent: EditExpenseComponent;

  constructor(
    public dialogRef: MdDialogRef<ExpenseComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
     this.fetchedUserCalendar._id = data.fetchedUserCalendar._id
     this.fetchedUserCalendar.title = data.fetchedUserCalendar.title
     this.fetchedUserCalendar.start = data.fetchedUserCalendar.start
     this.fetchedUserCalendar.end = data.fetchedUserCalendar.end
     this.fetchedUserCalendar.users = data.fetchedUserCalendar.users
     this.fetchedUserCalendar.projects = data.fetchedUserCalendar.projects
     this.fetchedUserCalendar.color = data.fetchedUserCalendar.color
     this.fetchedUserCalendar.details = data.fetchedUserCalendar.details
  }


  newExpenseSaved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
