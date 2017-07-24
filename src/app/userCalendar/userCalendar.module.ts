
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { UserCalendarSingleComponent} from './userCalendarSingle.component';
import { UserCalendarService} from './userCalendar.service';
import { UserCalendarRouting} from './userCalendarRouting.module';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule} from 'ng2-pagination';

import { QuoteModule} from '../quote/quote.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { DemoUtilsModule } from './demo-utils/module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    // BrowserAnimationsModule,
    NgbModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    UserCalendarRouting,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    QuoteModule,
    DemoUtilsModule,
    SharedModule

  ],
  declarations: [

    UserCalendarSingleComponent,

  ],
  exports:      [ UserCalendarSingleComponent ],
  providers:    [ UserCalendarService ],
  entryComponents: [

  ]
})
export class UserCalendarModule { }
