import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuoteDetailComponent} from './single/quoteDetail.component';
import { EditQuoteComponent} from './single/editQuote.component';

import { AdminGuardService} from '../admin/services/adminGuard';

import { QuotesComponent} from './quotes/quotes.component';

import { CompanieGuardService} from '../companie/companieGuard.service';
import { PaiementGuardService} from '../user/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';



export const routes: Routes = [
  {path: '', component: QuotesComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new', component: EditQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new/:idClient', component: EditQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new/:idClient/:idProject', component: EditQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'edit/:id', component: EditQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: ':id', component: QuoteDetailComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'public/:id', component: EditQuoteComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRouting {}
