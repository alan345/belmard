import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { ProjectsComponent} from './projects.component';
import { ProjectSingleComponent} from './projectSingle.component';
import { ProjectService} from './project.service';
import { ProjectRouting} from './projectRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import { QuoteModule} from '../quote/quote.module';





@NgModule({
  imports:      [
    ProjectRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
  ],
  declarations: [

    ProjectsComponent,
    ProjectSingleComponent,
  ],
  exports:      [ ProjectsComponent ],
  providers:    [ ProjectService ],
  entryComponents: [

  ]
})
export class ProjectModule { }
