import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { UserAccountRouting } from './userAccountRouting.module';
import { QuoteModule} from '../quote/quote.module';
import { PaiementQuoteModule} from '../paiementQuote/paiementQuote.module';
import { UserCalendarModule} from '../userCalendar/userCalendar.module';
// import { UserDialogComponent } from './singleUser/dialog/userDialog.component';
// import { DetailsUserComponent } from './singleUser/detailsUser/detailsUser.component';
// import { UserCrossComponent } from './singleUser/userCross/userCross.component';
import { RegisterComponent} from './register/register.component';
// import { UserComponent} from './singleUser/user.component';
// import { ChangePasswordComponent } from './singleUser/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';
// import { UserService} from './user.service';
import { LoginComponent} from './login/login.component';
// import { AdminUsersComponent } from './users/adminUsers.component';
import {SharedModule } from '../shared/shared.module';
import {MatExpansionModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';


// import { CompanieModule} from '../companie/companie.module';
// import { MaterialModule } from '@angular/material';
//import { UserDeleteDialog} from './userDeleteDialog.component';
//import { UserWhereDialogComponent} from './userWhereDialog.component';
//import { UserComponent} from './user.component';
//import { UsersComponent} from './users.component';
// import { UserService} from './user.service';
// import { RightModule} from '../right/right.module';

// import { ProjectModule} from '../project/project.module';

// import { SingleUserComponent} from './singleUser/singleUser.component';
// import { AddNoteComponent} from './singleUser/addNote.component';
// import { ChooseDateComponent} from './singleUser/chooseDate.component';
// import { AddProductsToUserComponent} from './singleUser/addProductsToUser.component';
// import { UserProductsHistory} from './singleUser/userProductsHistory.component';
// import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
// import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
// import { UserProfileComponent } from './singleUser/userProfile.component';
//import { ProfileService} from './singleUser/profile.service';
// import { PaiementService} from './paiement/paiement.service';
// import { PaiementComponent } from './paiement/paiement.component';
// import { PaiementPipe } from './paiement/paiement.pipe';
//import { UserFormsComponent} from '../form/userForms.component';
// import {MatIconModule} from '@angular/material';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'



@NgModule({
  imports:      [

    UserAccountRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    QuoteModule,
    PaiementQuoteModule,
    UserCalendarModule,
    // ProjectModule,
    // RightModule,
    // CompanieModule,
    SharedModule,
    // RightModule,
    MatExpansionModule,
    // MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,

    // AutocompleteComponent,
    // UserComponent,
    // UserDialogComponent,
    // DetailsUserComponent,
    // UserCrossComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,


    // AdminUsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    // UserProfileComponent,
    // PaiementComponent,
    // UserProfilePicturesComponent,
    // UserProfileSettingsComponent,
    // ChangePasswordComponent,

    RegisterComponent,
    // PaiementPipe,


  ],
  exports:      [
    // NewUserComponent,
    // AutocompleteComponent
    // UsersComponent
   ],
  providers:    [
    // ProfileService,

    // UserService,
    // PaiementService,
  ],
  entryComponents: [
    // UserDialogComponent
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserAccountModule { }
