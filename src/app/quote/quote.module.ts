import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

import { RoundPipe} from './round.pipe';
// import { ProjectModule} from '../project/project.module';

import { QuotesComponent} from './quotes/quotes.component';
import { EditQuoteComponent} from './editQuote.component';

import { QuoteDetailComponent} from './quoteDetail.component';
import { QuoteService} from './quote.service';
import { QuoteRouting} from './quoteRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProductModule } from '../product/product.module';

@NgModule({
  imports:      [
    // ProjectModule,
    QuoteRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
  ],
  declarations: [
    QuotesComponent,
    EditQuoteComponent,
    QuoteDetailComponent,
    RoundPipe,
  ],
  exports:      [ QuotesComponent ],
  providers:    [ QuoteService ],
  entryComponents: [ ]
})
export class QuoteModule { }
