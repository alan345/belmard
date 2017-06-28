import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { OptionDetailComponent} from './optionDetail.component';
import { EditOptionComponent} from './editOption.component';

import { AdminGuardService} from '../admin/services/adminGuard';

// import { OptionsComponent} from './options/options.component';



export const routes: Routes = [
  // {path: '', component: OptionsComponent},
  {path: '', component: EditOptionComponent},
  // {path: 'new/:idClient', component: EditOptionComponent},
  // {path: 'new/:idClient/:idProject', component: EditOptionComponent},
  // {path: 'edit/:id', component: EditOptionComponent},
  // {path: ':id', component: OptionDetailComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRouting {}
