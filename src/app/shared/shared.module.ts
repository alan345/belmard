import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'


@NgModule({
  imports:      [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AutocompleteComponent
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class SharedModule { }
