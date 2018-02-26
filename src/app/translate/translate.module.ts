import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TranslateService} from './translate.service';
import { TranslatePipe} from './translate.pipe';
import { TRANSLATION_PROVIDERS } from './translations';

// import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    // RightRouting,
    CommonModule,
    FormsModule,
    // MaterialModule,
    // ReactiveFormsModule,
    // RouterModule,
    // SharedModule,
  ],
  declarations: [
    // RightDetailUsersComponent,

    TranslatePipe,

    // AddUserByRightComponent,
  ],
  exports:      [
    TranslatePipe,
  ],
  providers:    [
    TRANSLATION_PROVIDERS,
    TranslateService ],
  entryComponents: [

  ]
})
export class TranslateModule { }
