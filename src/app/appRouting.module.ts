import {RouterModule, Routes} from '@angular/router';
import { PaiementGuardService} from './companie/single/paiement/paiementGuard.service';
import { AuthGuardService} from './auth/authguard.service';
import { NotClientGuardService} from './auth/notClientGuard.service';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import { NgModule } from '@angular/core';

// import {AdminComponent} from './admin/admin.component';
// import { MainPageHomeComponent} from './mainPageHome/mainPageHome.component';
// import {AdminGuardService} from './admin/services/adminGuard';
// import {ModuleWithProviders} from '@angular/core';
//import {USER_ROUTES} from './user/user.routes';
// import {ADMIN_ROUTES} from './admin/admin.routes';
// import {FormComponent} from './form/form.component';
// import {UserFormsComponent} from './form/userForms.component';
// import { UserFormsUploadAndList} from './form/userFormsUploadAndList.component';



export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule', canActivate: [AuthGuardService]},
  {path: 'quote', loadChildren: 'app/quote/quote.module#QuoteModule', canActivate: [AuthGuardService]},
  {path: 'paiementQuote', loadChildren: 'app/paiementQuote/paiementQuote.module#PaiementQuoteModule', canActivate: [AuthGuardService, PaiementGuardService]},
  {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService, PaiementGuardService]},
  {path: 'home', loadChildren: 'app/reporting/reporting.module#ReportingModule', canActivate: [AuthGuardService, NotClientGuardService]},
  {path: 'product', loadChildren: 'app/product/product.module#ProductModule', canActivate: [AuthGuardService, PaiementGuardService]},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
  {path: 'userAccount', loadChildren: 'app/userAccount/userAccount.module#UserAccountModule'},
  {path: 'right', loadChildren: 'app/right/right.module#RightModule', canActivate: [AuthGuardService, PaiementGuardService]},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}


  // {path: 'home', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full'},
  // {path: 'comment', loadChildren: 'app/comment/comment.module#CommentModule', canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'chat', loadChildren: 'app/chat/chat.module#ChatModule', canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'project', loadChildren: 'app/project/project.module#ProjectModule', canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'task', loadChildren: 'app/task/task.module#TaskModule', canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'notification', loadChildren: 'app/notification/notification.module#NotificationModule', canActivate: [AuthGuardService, PaiementGuardService]},

  // {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  // {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},

  // {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
