import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { AutocompleteModule } from '../autocomplete/autocomplete.module'


import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';

import { RoundPipe} from './round.pipe';
import { HeaderComponent } from '../nav/header/header.component';


@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    AutocompleteModule,

  ],
  declarations: [
    RoundPipe,
    // AutocompleteComponent,
    TranslatePipe,
    HeaderComponent,

  ],
  exports: [
    TranslatePipe,
    AutocompleteModule,
    CommonModule,
    FormsModule,
    RoundPipe,
    HeaderComponent,
    // AutocompleteComponent,
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService,
  ]
})
export class SharedModule { }
