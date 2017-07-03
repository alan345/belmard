import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { ProjectTasksComponent} from './projectTasks.component';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectSingleComponent} from './projectSingle.component';
import { ProjectService} from './project.service';
import { ProjectRouting} from './projectRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import { QuoteModule} from '../quote/quote.module';
import {DndModule} from 'ng2-dnd';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
  imports:     [
    DragulaModule,
    DndModule.forRoot(),
    ProjectRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
  ],
  declarations: [
    ProjectTasksComponent,
    ProjectsComponent,
    ProjectSingleComponent,
  ],
  exports:      [ ProjectsComponent ],
  providers:    [ ProjectService ],
  entryComponents: [

  ]
})
export class ProjectModule { }
