import { Routes, RouterModule }        from '@angular/router';
import { NgModule }            from '@angular/core';
import {ProductBatchsAdminComponent} from './productBatchsAdmin.component';
import {AdminGuardService} from '../admin/services/adminGuard';



export const routes: Routes = [
  {path: '', component: ProductBatchsAdminComponent, canActivate: [AdminGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBatchRouting {}
