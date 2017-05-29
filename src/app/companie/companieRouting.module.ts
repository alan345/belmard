import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanieDetailComponent} from './companieDetail.component';
import { EditCompanieComponent} from './editCompanie.component';
import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { CompaniePicturesComponent} from './companiePictures.component';
import { AdminGuardService} from '../admin/services/adminGuard';
import { CompanieDetailUsersComponent} from './companieDetailUsers.component';
import { CompaniesComponent} from './admin/companies.component';
import { AddUserByCompanieComponent} from './addUser/addUserByCompanie.component';



export const routes: Routes = [
  {path: 'admin', component: CompaniesComponent, canActivate: [AdminGuardService]},
  {path: 'edit/addUser/:id', component: EditAddUserToCompanieComponent},
  {path: 'edit/addUser/:id/:email', component: EditAddUserToCompanieComponent},
  {path: 'addUserByCompanie', component: AddUserByCompanieComponent},
  {path: 'new', component: EditCompanieComponent, canActivate: [AdminGuardService]},
  {path: 'edit/:id', component: EditCompanieComponent},
  {path: ':id/companiePictures', component: CompaniePicturesComponent},
  {path: ':id', component: CompanieDetailComponent},
  {path: ':id/users', component: CompanieDetailUsersComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanieRouting {}
