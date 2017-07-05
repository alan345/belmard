import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserRouting } from './userRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

//import { UserDeleteDialog} from './userDeleteDialog.component';
//import { UserWhereDialogComponent} from './userWhereDialog.component';
//import { UserComponent} from './user.component';
//import { UsersComponent} from './users.component';
// import { UserService} from './user.service';

import { QuoteModule} from '../quote/quote.module';
import { CompanieModule} from '../companie/companie.module';
import { ProjectModule} from '../project/project.module';



import { RegisterComponent} from './register/register.component';

import { NewUserComponent} from './singleUser/newUser.component';
// import { SingleUserComponent} from './singleUser/singleUser.component';
// import { AddNoteComponent} from './singleUser/addNote.component';
// import { ChooseDateComponent} from './singleUser/chooseDate.component';
// import { AddProductsToUserComponent} from './singleUser/addProductsToUser.component';
// import { UserProductsHistory} from './singleUser/userProductsHistory.component';

//
// import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
// import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
import { UserProfileComponent } from './singleUser/userProfile.component';

import { PaiementComponent } from './paiement/paiement.component';


//import { ProfileService} from './singleUser/profile.service';
import { ChangePasswordComponent } from './singleUser/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';

import { UserService} from './user.service';
import { PaiementService} from './paiement/paiement.service';
import { LoginComponent} from './login/login.component';
//import { UserFormsComponent} from '../form/userForms.component';

import{ AdminUsersComponent } from './users/adminUsers.component';


@NgModule({
  imports:      [

    UserRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
    ProjectModule,
    CompanieModule,
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,


    NewUserComponent,
    // SingleUserComponent,
    // AddNoteComponent,
    // ChooseDateComponent,
    // UserPicturesComponent,


    AdminUsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    UserProfileComponent,
    PaiementComponent,
    // UserProfilePicturesComponent,
    // UserProfileSettingsComponent,
    ChangePasswordComponent,

    RegisterComponent,


  ],
  exports:      [
    // UsersComponent
   ],
  providers:    [
    // ProfileService,
    UserService,
    PaiementService,
  ],
  entryComponents: [
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserModule { }
