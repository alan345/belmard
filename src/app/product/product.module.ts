import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


//import {ProductDeleteDialog} from './productDeleteDialog.component';
//import {ProductWhereDialogComponent} from './productWhereDialog.component';


import {ProductComponent} from './product.component';
import {ProductsComponent} from './products.component';
import {ProductSingleComponent} from './productSingle.component';
import {ProductEditComponent} from './productEdit.component';


import {ProductService} from './product.service';
import {ProductRouting} from './productRouting.module';

import { MaterialModule } from '@angular/material';
import {Ng2PaginationModule} from 'ng2-pagination';
import {SmallDescriptionPipe} from './product.pipe';
import {ProductsAdminComponent} from './admin/productsAdmin.component';



@NgModule({
  imports:      [
    ProductRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,

  ],
  declarations: [
  //  ProductDeleteDialog,
  //  ProductWhereDialogComponent,
    SmallDescriptionPipe,
    ProductComponent,
    ProductsComponent,
    ProductSingleComponent,
    ProductEditComponent,
    ProductsAdminComponent,
  ],
  exports:      [ ProductsComponent ],
  providers:    [ ProductService ],
  entryComponents: [
  //  ProductDeleteDialog,
  //  ProductWhereDialogComponent,
  ]
})
export class ProductModule { }
