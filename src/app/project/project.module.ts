import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ProjectDialogComponent } from './single/dialog/projectDialog.component';

// import { ProjectTasksComponent} from './task/singleTask/projectTasks.component';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectSingleComponent} from './single/projectSingle.component';
import { ProjectService} from './project.service';
import { ProjectRouting} from './projectRouting.module';

// import { TasksComponent} from './task/tasks/tasks.component';

import { TaskService} from '../task/task.service';
import { QuoteModule} from '../quote/quote.module';

import { DragulaModule } from 'ng2-dragula';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { AutocompleteModule } from '../autocomplete/autocomplete.module'
import {SharedModule } from '../shared/shared.module';
// import {UserModule} from '../user/user.module';
// import { TaskDialogComponent } from '../task/single/dialog/taskDialog.component'


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
    // ProjectTasksComponent,
    ProjectsComponent,
    ProjectSingleComponent,
    // TasksComponent,
    ProjectDialogComponent,
    // TaskDialogComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    ProjectsComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    ProjectService,
    TaskService],
  entryComponents: [
    ProjectDialogComponent,
    // TaskDialogComponent,
  ]
})
export class ProjectModule { }
