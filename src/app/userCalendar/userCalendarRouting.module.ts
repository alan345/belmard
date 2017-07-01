import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
//import { UserCalendarsComponent} from './userCalendars/userCalendars.component';
import { UserCalendarSingleComponent} from './userCalendarSingle.component';


export const routes: Routes = [
//  {path: '', component: UserCalendarsComponent},
  // {path: 'userCalendarSingle', component: UserCalendarSingleComponent},
  // {path: 'userCalendarSingle/:id', component: UserCalendarSingleComponent},
  // {path: 'new', component: UserCalendarSingleComponent},
  // {path: 'new/:idClient', component: UserCalendarSingleComponent},
  {path: '', component: UserCalendarSingleComponent},
  {path: ':idUser', component: UserCalendarSingleComponent},
  {path: ':idUser/:idProject', component: UserCalendarSingleComponent},
  {path: ':idUser/:idProject/:idClient', component: UserCalendarSingleComponent},
  {path: ':idUser/:idProject/:idClient/:typeUser', component: UserCalendarSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCalendarRouting {}
