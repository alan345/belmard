import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


import { QuotesComponent} from './quotes/quotes.component';
import { EditQuoteComponent} from './editQuote.component';

import { QuoteDetailComponent} from './quoteDetail.component';
import { QuoteService} from './quote.service';
import { QuoteRouting} from './quoteRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  imports:      [

    QuoteRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [

    QuotesComponent,
    EditQuoteComponent,

    QuoteDetailComponent,
    
  ],
  exports:      [ ],
  providers:    [ QuoteService ],
  entryComponents: [ ]
})
export class QuoteModule { }
