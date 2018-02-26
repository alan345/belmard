import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
// import { UserModule} from '../user/user.module'
// import {NewUserComponent} from '../user/singleUser/newUser.component'
// import {SharedModule } from '../shared/shared.module';
import { newObjDialogComponent } from './newObjDialog/newObjDialog.component';
import { TranslateModule} from '../translate/translate.module';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {LoadingInAppModule} from '../nav/loadingInApp/loadingInApp.module';

import {QuoteService} from '../quote/quote.service';
import {RightService} from '../right/right.service';
import {TemplateQuoteService} from '../quote/templateQuote.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoadingInAppModule,
    // SharedModule,
    // UserModule,

  ],
  declarations: [
    AutocompleteComponent,
    newObjDialogComponent,
    // NewUserComponent
  ],
  exports: [
    AutocompleteComponent,
    newObjDialogComponent,
  ],
  providers: [
    QuoteService,
    TemplateQuoteService,
    RightService,
  ]
})
export class AutocompleteModule { }
