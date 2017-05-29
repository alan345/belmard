import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


//import {ProductBatchDeleteDialog} from './productBatchDeleteDialog.component';
//import {ProductBatchWhereDialogComponent} from './productBatchWhereDialog.component';


//import {ProductBatchComponent} from './productBatch.component';
// import {ProductBatchsComponent} from './productBatchs.component';
// import {ProductBatchSingleComponent} from './productBatchSingle.component';
// import {ProductBatchEditComponent} from './productBatchEdit.component';


import { ProductBatchService} from './productBatch.service';
import { ProductBatchRouting} from './productBatchRouting.module';

import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
//import {SmallDescriptionPipe} from './productBatch.pipe';
import { ProductBatchsAdminComponent} from './productBatchsAdmin.component';



@NgModule({
  imports:      [
    ProductBatchRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,

  ],
  declarations: [
  //  ProductBatchDeleteDialog,
  //  ProductBatchWhereDialogComponent,
  //  SmallDescriptionPipe,
  //  ProductBatchComponent,
    // ProductBatchsComponent,
    // ProductBatchSingleComponent,
    // ProductBatchEditComponent,
    ProductBatchsAdminComponent,
  ],
  exports:      [  ],
  providers:    [ ProductBatchService ],
  entryComponents: [
  //  ProductBatchDeleteDialog,
  //  ProductBatchWhereDialogComponent,
  ]
})
export class ProductBatchModule { }
