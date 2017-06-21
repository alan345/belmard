import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuoteDetailComponent} from './quoteDetail.component';
import { EditQuoteComponent} from './editQuote.component';

import { AdminGuardService} from '../admin/services/adminGuard';

import { QuotesComponent} from './quotes/quotes.component';



export const routes: Routes = [
  {path: '', component: QuotesComponent},
  {path: 'new', component: EditQuoteComponent},
  {path: 'new/:idClient', component: EditQuoteComponent},
  {path: 'new/:idClient/:idProject', component: EditQuoteComponent},
  {path: 'edit/:id', component: EditQuoteComponent},
  {path: ':id', component: QuoteDetailComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRouting {}
