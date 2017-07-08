import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

import { RoundPipe} from './round.pipe';
// import { ProjectModule} from '../project/project.module';

import { QuotesComponent} from './quotes/quotes.component';
import { EditQuoteComponent} from './single/editQuote.component';

import { QuoteDetailComponent} from './single/quoteDetail.component';
import { QuoteService} from './quote.service';
import { QuoteRouting} from './quoteRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';


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
    SharedModule,
    SignaturePadModule,
    // AutocompleteComponent,
  ],
  declarations: [
    QuotesComponent,
    EditQuoteComponent,
    QuoteDetailComponent,
    RoundPipe,
    // AutocompleteComponent
  ],
  exports:      [
    QuotesComponent,
    // AutocompleteComponent,
  ],
  providers:    [ QuoteService ],
  entryComponents: [ ]
})
export class QuoteModule { }
