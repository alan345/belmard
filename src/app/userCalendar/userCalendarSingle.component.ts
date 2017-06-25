import { Component, OnInit} from '@angular/core';
import { UserCalendarService} from './userCalendar.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserCalendar } from './userCalendar.model';
import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { UserService} from '../user/user.service';
import { QuoteService} from '../quote/quote.service';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { colors } from './demo-utils/colors';




@Component({
  selector: 'app-userCalendars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './userCalendarSingle.component.html',
  styleUrls: ['./userCalendar.component.css'],

})

export class UserCalendarSingleComponent implements OnInit {


    view: string = 'month';
    viewDate: Date = new Date();
    events$: Observable<CalendarEvent<{userCalendar: UserCalendar}>[]>;
    activeDayIsOpen: boolean = false;

    constructor(
      private userCalendarService: UserCalendarService,
      private http: Http,
      private toastr: ToastsManager,
      private router: Router,
    ) {}

    ngOnInit(): void {
      this.fetchEvents();
    }


    refresh(){
      this.fetchEvents()
    }


    fetchEvents(): void {

      const getStart: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
      }[this.view];

      const getEnd: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
      }[this.view];

      const search: URLSearchParams = new URLSearchParams();
      search.set('primary_release_date.gte', format(getStart(this.viewDate), 'YYYY-MM-DD'));
      search.set('primary_release_date.lte', format(getEnd(this.viewDate), 'YYYY-MM-DD'));
      search.set('api_key', '0ec33936a68018857d727958dca1424f');

      this.events$ = this.http
        .get('user', {search})
        .map(res => res.json())
        .map(({results}: {results: UserCalendar[]}) => {
          return results.map((userCalendar: UserCalendar) => {
            return {
              title: userCalendar.title,
              start: userCalendar.start,
              end: userCalendar.end,
              color: colors.yellow,
              // meta: userCalendar.meta
            };
          });
        });
    }

    dayClicked({date, events}: {date: Date, events: CalendarEvent<{userCalendar: UserCalendar}>[]}): void {

      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }

    eventClicked(event: CalendarEvent<{userCalendar: UserCalendar}>): void {
      window.open(`https://www.themoviedb.org/movie/`, '_blank');
    }





      save() {
        this.events$.subscribe(

          res => {
            let event:CalendarEvent = res[0]
            console.log(event)


                this.userCalendarService.saveUserCalendar(event)
                  .subscribe(
                    res => {
                      this.toastr.success('Great!', res.message)
                    //    this.router.navigate(['quote/edit/' + res.obj._id])
                    },
                    error => {console.log(error)}
                  )

          },
          error => {
            console.log(error);
          }
        )


      //
      //   if(event._id) {
      //     this.userCalendarService.updateUserCalendar(event)
      //       .subscribe(
      //         res => {
      //           this.toastr.success('Great!', res.message)
      //           //this.router.navigate(['quote/edit/' + this.fetchedQuote._id])
      //         },
      //         error => {
      //           this.toastr.error('error!', error)
      //         }
      //       )
      //   } else {
      //     this.userCalendarService.saveUserCalendar(event)
      //       .subscribe(
      //         res => {
      //           this.toastr.success('Great!', res.message)
      //             this.router.navigate(['quote/edit/' + res.obj._id])
      //         },
      //         error => {console.log(error)}
      //       )
      //   }
      //
      }



}
