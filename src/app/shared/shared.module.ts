import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';



@NgModule({
  imports:      [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AutocompleteComponent,
    TranslatePipe,

  ],
  exports: [
    TranslatePipe,
    AutocompleteComponent,
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService,
  ]
})
export class SharedModule { }
