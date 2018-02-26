import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuoteComponent} from './single/quote.component';
import { QuotesComponent} from './list/quotes.component';
import { PaiementGuardService} from '../companie/single/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';

// import { AdminGuardService} from '../admin/services/adminGuard';
// import { QuoteDetailComponent} from './single/quoteDetail.component';



export const routes: Routes = [

  {path: 'new', component: QuoteComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  {path: ':idQuote', component: QuoteComponent, canActivate: [AuthGuardService]},
  {path: 'list/:searchType', component: QuotesComponent, canActivate: [AuthGuardService]},
  // {path: 'new/:idClient', component: QuoteComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: QuoteComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: ':id', component: QuoteDetailComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'public/:idQuote', component: QuoteComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRouting {}
