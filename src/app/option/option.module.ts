import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';


// import { ProjectModule} from '../project/project.module';

//import { OptionsComponent} from './options/options.component';
import { EditOptionComponent} from './editOption.component';

//import { OptionDetailComponent} from './optionDetail.component';
import { OptionService} from './option.service';
import { OptionRouting} from './optionRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProductModule } from '../product/product.module';

@NgModule({
  imports:      [
    // ProjectModule,
    OptionRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
  ],
  declarations: [

    EditOptionComponent,
//    OptionDetailComponent,

  ],
  exports:      [
    //OptionsComponent
   ],
  providers:    [ OptionService ],
  entryComponents: [ ]
})
export class OptionModule { }
