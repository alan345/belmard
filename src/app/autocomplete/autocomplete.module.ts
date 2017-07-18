import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { FormsModule }         from '@angular/forms';
// import { UserModule} from '../user/user.module'
// import {NewUserComponent} from '../user/singleUser/newUser.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // UserModule,

  ],
  declarations: [
    AutocompleteComponent,
    // NewUserComponent
  ],
  exports: [
    AutocompleteComponent,
  ],
})
export class AutocompleteModule { }
