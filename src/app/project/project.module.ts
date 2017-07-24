import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';


import { ProjectTasksComponent} from './task/singleTask/projectTasks.component';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectSingleComponent} from './projectSingle/projectSingle.component';
import { ProjectService} from './project.service';
import { ProjectRouting} from './projectRouting.module';

import { TasksComponent} from './task/tasks/tasks.component';


import { QuoteModule} from '../quote/quote.module';

import { DragulaModule } from 'ng2-dragula';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';

@NgModule({
  imports:     [
    // UserModule,
    DragulaModule,
    ProjectRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
    SharedModule

    // AutocompleteModule,
  ],
  declarations: [
    ProjectTasksComponent,
    ProjectsComponent,
    ProjectSingleComponent,
    TasksComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    ProjectsComponent,
    // AutocompleteComponent,
  ],
  providers:    [ ProjectService ],
  entryComponents: [

  ]
})
export class ProjectModule { }
