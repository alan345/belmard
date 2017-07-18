import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';



import { TaskComponent} from './single/task.component';
// import { TaskSingleComponent} from './taskSingle/taskSingle.component';
import { TaskService} from './task.service';
import { TaskRouting} from './taskRouting.module';
import { TasksComponent} from './tasks/tasks.component';


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
    TaskRouting,
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

    TaskComponent,
    TasksComponent,
    // TaskSingleComponent,
    // AutocompleteComponent,
  ],
  exports:      [
    TaskComponent,
    // AutocompleteComponent,
  ],
  providers:    [ TaskService ],
  entryComponents: [

  ]
})
export class TaskModule { }
