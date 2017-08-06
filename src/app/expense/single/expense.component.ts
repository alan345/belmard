import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Injectable, NgModule} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ExpenseService} from '../expense.service';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {Expense} from '../expense.model';
import { UserCalendar } from '../userCalendar.model';
import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';

import { UserCalendarService} from '../userCalendar.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['../expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  // @Output() newExpenseSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showHeader = true;
  @Input() fetchedQuote:Quote = new Quote()

  @ViewChild('myCal', { read: ElementRef }) myCal: ElementRef;


  showPaiements: boolean = false
  fetchedExpense : Expense = new Expense()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []
  fetchedProjects: Project[] = []
  // currentUser: User = new User()
  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  search= {
    typeUser:[],
    clientSearch:'',
    userSearch:'',
    projectSearch:'',
    endDate: '2017/09/01',
    startDate: '2007/09/01',
  }
  events: UserCalendar[] = []
  myForm: FormGroup;
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' }
]




    calendarOptions:Object = {
      height: '600px',
      selectable: true,
      dayClick: this.dayClick.bind(this),
      eventClick: this.eventClick.bind(this),
      eventMouseover: this.eventMouseover.bind(this),
      eventMouseout: this.eventMouseout.bind(this),
      select: this.select.bind(this),
      unselect: this.unselect.bind(this),
      eventDragStart: this.eventDragStart.bind(this),
      eventDragStop: this.eventDragStop.bind(this),
      eventDrop: this.eventDrop.bind(this),
      eventResizeStart: this.eventResizeStart.bind(this),
      eventResizeStop: this.eventResizeStop.bind(this),
      eventResize: this.eventResize.bind(this),
      header: {
          left:   'title',
          center: '',
          right:  'today prev,next agendaWeek,month'
      },
      fixedWeekCount : false,
      defaultDate: '2016-09-12',
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.events,

      // events: [
      //   {
      //     title: 'All Day Event',
      //     start: '2016-09-01'
      //   },
      //   {
      //     title: 'Long Event',
      //     start: '2016-09-07',
      //     end: '2016-09-10'
      //   },
      //   {
      //     id: 999,
      //     title: 'Repeating Event',
      //     start: '2016-09-09T16:00:00'
      //   },
      //   {
      //     id: 999,
      //     title: 'Repeating Event',
      //     start: '2016-09-16T16:00:00'
      //   },
      //   {
      //     title: 'Conference',
      //     start: '2016-09-11',
      //     end: '2016-09-13'
      //   },
      //   {
      //     title: 'Meeting',
      //     start: '2016-09-12T10:30:00',
      //     end: '2016-09-12T12:30:00'
      //   },
      //   {
      //     title: 'Lunch',
      //     start: '2016-09-12T12:00:00'
      //   },
      //   {
      //     title: 'Meeting',
      //     start: '2016-09-12T14:30:00'
      //   },
      //   {
      //     title: 'Happy Hour',
      //     start: '2016-09-12T17:30:00'
      //   },
      //   {
      //     title: 'Dinner',
      //     start: '2016-09-12T20:00:00'
      //   },
      //   {
      //     title: 'Birthday Party',
      //     start: '2016-09-13T07:00:00'
      //   },
      //   {
      //     title: 'Click for Google',
      //     url: 'http://google.com/',
      //     start: '2016-09-28'
      //   }
      // ]
    };


  constructor(
    private userCalendarService: UserCalendarService,
    private expenseService: ExpenseService,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}
  onCalendarInit() {
    console.log('Calendar initialized');
  }
  ngOnInit() {
    this.getUserCalendars(1, this.search)
  }

      getUserCalendars(page: number, search: any) {
        this.userCalendarService.getUserCalendars(page, search)
          .subscribe(
            res => {
              this.events = []
              this.events = res.data

              // this.updateCalendar(this.events)
              // res.data.forEach(event => {
              //   let newEvent: UserCalendar = new UserCalendar();
              //   newEvent = event
              //   newEvent.start = new Date(event.start)
              //   newEvent.end = new Date(event.end)
              //   event.users.forEach(user => {
              //     newEvent.color.primary = user.profile.colorCalendar
              //   });
              //
              //   newEvent.isActiveEvent = false
              //   this.events.push(newEvent)
              //
              // });
            },
            error => {
              console.log(error);
            }
          );
      }

      test() {

      }
    updateCalendar(events) {

      // this.events = [
      //   {
      //     title: 'All Day Event',
      //     start: '2017-09-01'
      //   },
      //   {
      //     title: 'Long Event',
      //     start: '2017-09-07',
      //     end: '2017-09-10'
      //   }]
      console.log(events)
      // $(this.myCal.nativeElement).fullCalendar('refetchEvents')
    }

  dayClick(event, jsEvent, view ){
    console.log('dayClick')
    console.log(event, jsEvent, view )
  }
  eventClick(event, jsEvent, view ){
    console.log('eventClick')
    console.log(event, jsEvent, view )
  }
  eventMouseover(event, jsEvent, view ){
    console.log('eventMouseover')
    console.log(event, jsEvent, view )
  }
  eventMouseout(event, jsEvent, view ){
    console.log('eventMouseout')
    console.log(event, jsEvent, view )
  }
  select(event, jsEvent, view ){
    console.log('select')
    console.log(event, jsEvent, view )
  }
  unselect(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventDragStart(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventDragStop(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventDrop(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventResizeStart(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventResizeStop(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }
  eventResize(event, jsEvent, view ){
    console.log('unselect')
    console.log(event, jsEvent, view )
  }




}
