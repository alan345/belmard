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

import { DragulaModule } from 'ng2-dragula';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'

@NgModule({
  imports:     [
    DragulaModule,
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
    AutocompleteComponent,
  ],
  exports:      [
    ProjectsComponent,
    AutocompleteComponent,
  ],
  providers:    [ ProjectService ],
  entryComponents: [

  ]
})
export class ProjectModule { }
