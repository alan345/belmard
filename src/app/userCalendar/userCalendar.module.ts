import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



//import { UserCalendarsComponent} from './userCalendars/userCalendars.component';
import { UserCalendarSingleComponent} from './userCalendarSingle.component';
import { UserCalendarService} from './userCalendar.service';
import { UserCalendarRouting} from './userCalendarRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import { QuoteModule} from '../quote/quote.module';

//import {UserCalendarComponent} from "angular2-fulluserCalendar/src/userCalendar/userCalendar";
//import {UserCalendarModule} from "ap-angular2-fulluserCalendar";
//import {UserCalendarComponent} from "ap-angular2-fulluserCalendar";



@NgModule({
  imports:      [

    UserCalendarRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
  //  UserCalendarModuleFullUserCalendar.forRoot()
  ],
  declarations: [

//    UserCalendarsComponent,
    UserCalendarSingleComponent,
  //  UserCalendarComponent,
  ],
  exports:      [ UserCalendarSingleComponent ],
  providers:    [ UserCalendarService ],
  entryComponents: [

  ]
})
export class UserCalendarModule { }
