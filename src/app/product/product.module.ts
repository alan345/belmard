import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { ProductsComponent} from './products/products.component';
import { ProductSingleComponent} from './productSingle.component';
import { ProductService} from './product.service';
import { CompanieModule } from '../companie/companie.module';
import { ProductRouting} from './productRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import {SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    ProductRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    CompanieModule,
    SharedModule,
  ],
  declarations: [

    ProductsComponent,
    ProductSingleComponent,

  ],
  exports:      [ ProductsComponent ],
  providers:    [

    ProductService ],
  entryComponents: [ ]
})
export class ProductModule { }
