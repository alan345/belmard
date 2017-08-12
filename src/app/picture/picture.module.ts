import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component'
import { FormsModule }         from '@angular/forms';
// import { UserModule} from '../user/user.module'
// import {NewUserComponent} from '../user/singleUser/newUser.component'
// import {SharedModule } from '../shared/shared.module';
// import { newObjDialogComponent } from './newObjDialog/newObjDialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // SharedModule,
    // UserModule,

  ],
  declarations: [
    PictureComponent,

    // NewUserComponent
  ],
  exports: [
    PictureComponent,

  ],
  providers: [

  ]
})
export class PictureModule { }
