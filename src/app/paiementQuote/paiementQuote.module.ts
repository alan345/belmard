import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { PaiementQuoteDialogComponent } from './single/dialog/paiementQuoteDialog.component';
import { MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { PaiementQuotesComponent} from './paiementQuotes/paiementQuotes.component';
import { EditPaiementQuoteComponent} from './single/editPaiementQuote.component';
import {MatCardModule} from '@angular/material';
import { PaiementQuoteService} from './paiementQuote.service';
import { PaiementQuoteRouting} from './paiementQuoteRouting.module';
import { ProductModule } from '../product/product.module';
import {SharedModule } from '../shared/shared.module';
import { PaiementPipe } from './paiement.pipe';
import {MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {PaiementCardModule} from '../nav/paiementCard/paiementCard.module';
import {MatNativeDateModule} from '@angular/material';
// import { CommonModule } from '@angular/common';
// import { ProjectModule} from '../project/project.module';
// import { PaiementService} from './paiement.service';
// import { MaterialModule } from '@angular/material';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { SignaturePadModule } from 'angular2-signaturepad';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { DateAdapter, NativeDateAdapter } from '@angular/material';

@NgModule({
  imports:      [
    // ProjectModule,
    // NgbModule,
    PaiementQuoteRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
    SharedModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    PaiementCardModule,
    MatNativeDateModule,
    // SignaturePadModule,
    // AutocompleteComponent,
  ],
  declarations: [
    PaiementQuotesComponent,
    EditPaiementQuoteComponent,
    PaiementQuoteDialogComponent,
    PaiementPipe,

    // AutocompleteComponent
  ],
  exports:      [
    PaiementQuotesComponent,
    EditPaiementQuoteComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    PaiementQuoteService,
    // PaiementService
  ],
  entryComponents: [
    PaiementQuoteDialogComponent,
  ]
})
export class PaiementQuoteModule { }
