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


import { RegisterComponent} from './register/register.component';
import { UserComponent} from './user.component';
import { NewUserComponent} from './singleUser/newUser.component';
import { SingleUserComponent} from './singleUser/singleUser.component';
import { AddNoteComponent} from './singleUser/addNote.component';
import { ChooseDateComponent} from './singleUser/chooseDate.component';
// import { AddProductsToUserComponent} from './singleUser/addProductsToUser.component';
// import { UserProductsHistory} from './singleUser/userProductsHistory.component';


import { UserProfileSettingsComponent } from './profile/userProfileSettings.component';
import { UserProfilePicturesComponent } from './profile/userProfilePictures.component';
import { UserProfileComponent } from './profile/userProfile.component';
import { ProfileService} from './profile/profile.service';
import { ChangePasswordComponent } from './profile/changePassword/changePassword.component';
import { ResetPasswordComponent} from './accountRecover/resetPassword.component';
import { ForgetPasswordComponent} from './accountRecover/forgetPassword.component';
import { UserPicturesComponent} from './singleUser/userPictures.component';
import { UserService} from './user.service';
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
  ],
  declarations: [
//    UserDeleteDialog,
//    UserWhereDialogComponent,
    UserComponent,
//    UsersComponent,
    //UserSingleComponent,

  //  UserComponent,
    NewUserComponent,
    SingleUserComponent,
    AddNoteComponent,
    ChooseDateComponent,
    UserPicturesComponent,
    // AddProductsToUserComponent,
    // UserProductsHistory,


    AdminUsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,

    UserProfileComponent,
    UserProfilePicturesComponent,
    UserProfileSettingsComponent,
    ChangePasswordComponent,

  //  UserFormsComponent,

    RegisterComponent,


  ],
  exports:      [
    // UsersComponent
   ],
  providers:    [
    ProfileService,
    UserService
  ],
  entryComponents: [
  //  UserDeleteDialog,
//    UserWhereDialogComponent,
  ]
})
export class UserModule { }
