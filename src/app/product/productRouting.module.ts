import { Routes, RouterModule }        from '@angular/router';
import { NgModule }            from '@angular/core';


import {ProductsComponent} from './products.component';
import {ProductSingleComponent} from './productSingle.component';
import {ProductEditComponent} from './productEdit.component';
import {ProductsAdminComponent} from './admin/productsAdmin.component';

import {AdminGuardService} from '../admin/services/adminGuard';



export const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'admin', component: ProductsAdminComponent, canActivate: [AdminGuardService]},

  {path: ':id', component: ProductSingleComponent},
//  {path: 'productEdit', component: ProductEditComponent},
  {path: 'productEdit/:id', component: ProductEditComponent, canActivate: [AdminGuardService]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouting {}
