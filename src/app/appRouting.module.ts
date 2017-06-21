import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
//import {USER_ROUTES} from './user/user.routes';

import {ADMIN_ROUTES} from './admin/admin.routes';
import {FormComponent} from './form/form.component';
import {UserFormsComponent} from './form/userForms.component';
import {UserFormsUploadAndList} from './form/userFormsUploadAndList.component';



import {AuthGuardService} from './auth/authguard.service';

import {MainPageHomeComponent} from './mainPageHome/mainPageHome.component';


//import {USER_COMPANIES} from './companie/companie.routes';
//import {CompanieComponent} from './companie/companie.component';



//
//
// import {USER_PROMOTIONS} from './promotion/promotion.routes';
// import {PromotionComponent} from './promotion/promotion.component';
//
// import {USER_PRESSES} from './press/press.routes';
// import {PressComponent} from './press/press.component';


import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

import { NgModule }             from '@angular/core';



export const routes: Routes = [
  {path: '', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full'},


  {path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule'},
  {path: 'quote', loadChildren: 'app/quote/quote.module#QuoteModule'},
  {path: 'product', loadChildren: 'app/product/product.module#ProductModule'},
  {path: 'project', loadChildren: 'app/project/project.module#ProjectModule'},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},

  {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},

  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
