import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import {PictureModule} from '../picture/picture.module';
import { HeaderTitleComponent } from '../nav/headerTitle/headerTitle.component';
import { TranslateModule} from '../translate/translate.module';
import { SortComponent } from './sort/sort.component';
import { AddressComponent } from './address/address.component';
import {DeleteDialogComponent} from '../nav/deleteDialog/deleteDialog.component';
import {AddressService} from './address/address.service';
import {UserService} from '../user/user.service';
import {SharedSmallModule} from './sharedSmall.module';
import {MatRadioModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import 'hammerjs';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

// import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';

// import { RoundPipe} from './round.pipe';
// import { CurrencyPipe} from './round.pipe';
// import { HeaderComponent } from '../nav/header/header.component';
// import { newObjDialogComponent } from '../nav/newObjDialog/newObjDialog.component';

// import { LoadingInAppComponent } from '../nav/loadingInApp/loadingInApp.component';
// import { LoginInAppComponent } from '../nav/loginInApp/loginInApp.component';

// import {CommentModule} from '../comment/comment.module';

@NgModule({
  imports:      [

    SharedSmallModule,
    CommonModule,
    FormsModule,
    AutocompleteModule,
    PictureModule,
    // CommentModule,
    TranslateModule,
    MatRadioModule,
    MatSelectModule,


  ],
  declarations: [
    SortComponent,
    AddressComponent,
    // RoundPipe,
    // AutocompleteComponent,
    // TranslatePipe,
    // HeaderComponent,
    // newObjDialogComponent,
    // LoadingInAppComponent,
    // LoginInAppComponent,
    DeleteDialogComponent,
    HeaderTitleComponent,

  ],
  exports: [
    // TranslatePipe,
    SharedSmallModule,
    AutocompleteModule,
    CommonModule,
    FormsModule,
    // RoundPipe,
    // HeaderComponent,
    SortComponent,
    AddressComponent,
    // newObjDialogComponent,
    // LoadingComponent,
    // LoadingInAppComponent,
    // LoginInAppComponent,
    PictureModule,
    DeleteDialogComponent,
    HeaderTitleComponent,
    // CommentModule,
    // AutocompleteComponent,
  ],
  providers: [
    AddressService,
    UserService,
    // TRANSLATION_PROVIDERS,
    // TranslateService,
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class SharedModule { }
