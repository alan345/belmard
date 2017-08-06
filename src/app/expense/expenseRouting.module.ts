import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ExpenseComponent} from './single/expense.component';

import { AdminGuardService} from '../admin/services/adminGuard';

import { ExpensesComponent} from './expenses/expenses.component';

import { CompanieGuardService} from '../companie/companieGuard.service';
import { PaiementGuardService} from '../user/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';


export const routes: Routes = [
  {path: '', component: ExpensesComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new', component: ExpenseComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new/:idQuote', component: ExpenseComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: EditExpenseComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'edit/:idExpense', component: ExpenseComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: ':id', component: ExpenseDetailComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'public/:idExpense', component: ExpenseComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRouting {}
