import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


// import { ProjectModule} from '../project/project.module';

import { PaiementQuotesComponent} from './paiementQuotes/paiementQuotes.component';
import { EditPaiementQuoteComponent} from './single/editPaiementQuote.component';


import { PaiementQuoteService} from './paiementQuote.service';
import { PaiementQuoteRouting} from './paiementQuoteRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProductModule } from '../product/product.module';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import {SharedModule } from '../shared/shared.module';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  imports:      [
    // ProjectModule,

    PaiementQuoteRouting,
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
    PaiementQuotesComponent,
    EditPaiementQuoteComponent,


    // AutocompleteComponent
  ],
  exports:      [
    PaiementQuotesComponent,
    // AutocompleteComponent,
  ],
  providers:    [ PaiementQuoteService ],
  entryComponents: [ ]
})
export class PaiementQuoteModule { }