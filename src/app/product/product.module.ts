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

import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from '../translate';




@NgModule({
  imports:      [
    ProductRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    CompanieModule,
  ],
  declarations: [

    ProductsComponent,
    ProductSingleComponent,
    TranslatePipe,
  ],
  exports:      [ ProductsComponent ],
  providers:    [
    TRANSLATION_PROVIDERS,
    TranslateService,
    ProductService ],
  entryComponents: [ ]
})
export class ProductModule { }
