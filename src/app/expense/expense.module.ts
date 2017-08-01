import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { ExpenseDialogComponent } from './single/dialog/expenseDialog.component'

// import { ProjectModule} from '../project/project.module';

import { ExpensesComponent} from './expenses/expenses.component';
import { ExpenseComponent} from './single/expense.component';


import { ExpenseService} from './expense.service';
import { ExpenseRouting} from './expenseRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [
    // ProjectModule,
    // NgbModule,
    ExpenseRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
    SharedModule,
    SignaturePadModule,
    // AutocompleteComponent,
  ],
  declarations: [
    ExpensesComponent,
    ExpenseComponent,
    ExpenseDialogComponent,

    // AutocompleteComponent
  ],
  exports:      [
    ExpensesComponent,
    ExpenseComponent,
    // AutocompleteComponent,
  ],
  providers:    [ ExpenseService ],
  entryComponents: [
    ExpenseDialogComponent,
  ]
})
export class ExpenseModule { }
