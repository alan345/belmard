import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserCalendarService } from '../userCalendar.service';
import { UserCalendar, SearchData } from '../userCalendar.model';
import { Search } from '../../shared/shared.model';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Companie } from '../../companie/companie.model';
import { CompanieService} from '../../companie/companie.service';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { UserCalendarDialogComponent } from '../single/dialog/userCalendarDialog.component';
import { TranslateService } from '../../translate/translate.service';
import { SearchCalendarComponent } from './search/searchCalendar.component';



// import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
// import { Product } from '../../product/product.model';
// import { Project } from '../../project/project.model';
// import { ToastsManager } from 'ng2-toastr';
// import { GlobalEventsManager } from '../../globalEventsManager';



// import * as $ from 'jquery';

@Component({
  selector: 'app-user-calendars',
  templateUrl: './userCalendars.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class UserCalendarsComponent implements OnInit {
  // @Output() newUserCalendarSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showHeader = true;
  // @Input() fetchedQuote: Quote = new Quote()

  // @ViewChild('myCal', { read: ElementRef }) myCal: ElementRef;
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  @ViewChild(SearchCalendarComponent) private searchCalendarComponent: SearchCalendarComponent;
  @Input() search: Search = new Search()
  @Input() showSearch = true;
  @Input() showTitle = true;

  myCompanie: Companie = new Companie()
  isSearchInitReady = false;
  fetchedUserCalendar: UserCalendar = new UserCalendar()

  // currentUser: User = new User()
  readyCalendar = false;
  loading = false;
  showCustomerData = true;
  searchData: SearchData = new SearchData()
  // search = {
  //   typeUser: '',
  //   userSearch: '',
  //   userId: '',
  //   projectSearch: '',
  //   endDate: new Date(),
  //   startDate: new Date(),
  // }

  events: UserCalendar[] = []
  myForm: FormGroup;

  // loading = false;
  calendarOptions: {}
  modeInput = true;


  constructor(
    private companieService: CompanieService,
    private userService: UserService,
    private userCalendarService: UserCalendarService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    private translateService: TranslateService,
    // private toastr: ToastsManager,
    // private globalEventsManager: GlobalEventsManager,
  ) { }
  onCalendarInit(result) {
    if (this.showSearch) {
      this.searchCalendarComponent.calendarInitialized()
    }

    // this.getUserCalendarsInit()
    // console.log('Calendar initialized');
  }

  getUserCalendarsInit() {
    // this.getUserCalendars(1, this.search)
  }
  ngOnInit() {
    this.getMyCompanie()

    //   this.activatedRoute.params.subscribe((params: Params) => {
    //     // if(params['idUserSearch']) {this.getUserSearch(params['idUserSearch'])}
    //   // if(params['idProjectSearch']) {this.getProjectSearch(params['idProjectSearch'])}
    //   // if(params['idClientSearch']) {this.getClientSearch(params['idClientSearch'])}
    //   // if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}
    // })
  }

  //   getUserSearch(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         this.fetchedUserSearchs = [res]
  //       },
  //       error => { console.log(error) }
  //     )
  // }

  initCalendar() {

    let slotDuration = ''
    let timeBegin = ''
    let timeEnd = ''
    let timeBeginbusinessHours= ''
    let timeEndbusinessHours = ''
    let hiddenDays = []


    // this.currentUser.ownerCompanies.forEach(companie => {
      hiddenDays = this.myCompanie.option.calendar.daysToHide
      timeBegin = this.myCompanie.option.calendar.timeBegin
      timeEnd = this.myCompanie.option.calendar.timeEnd
      timeBeginbusinessHours = this.myCompanie.option.calendar.timeBeginbusinessHours
      timeEndbusinessHours = this.myCompanie.option.calendar.timeEndbusinessHours

      slotDuration = this.myCompanie.option.calendar.slotDuration
    // })
    if(!slotDuration) {slotDuration = '00:30:00'}
    if(!timeBegin) {timeBegin = '06:00:00'}
    if(!timeEnd) {timeEnd = '19:00:00'}
    // console.log(hiddenDays)

    this.calendarOptions = {
      timezone: 'local',
      height: 'auto',
      selectable: true,
      firstDay: 1,
      hiddenDays: hiddenDays,
      minTime: timeBegin,
      maxTime: timeEnd,
      slotDuration: slotDuration,
      locale: 'fr',
      slotLabelFormat: "HH:mm",
      columnFormat: 'ddd D/M',
      allDaySlot: false,
      nowIndicator: true,
      businessHours: {
        dow: [1, 2, 3, 4, 5],
        start: timeBeginbusinessHours,
        end: timeEndbusinessHours,
      },
      header: {
        left: '',
        center: '',
        right: 'prev,today,next month,agendaWeek,listYear'
      },

      buttonText: {
        today:    this.translateService.instant('⇔'),
        month:    this.translateService.instant('Month'),
        week:     this.translateService.instant('Week'),
        // day:      this.translateService.instant('Day'),
        list:     this.translateService.instant('Year'),
      },
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
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
      viewRender: this.viewRender.bind(this),
      eventRender: this.eventRender.bind(this),
    };
    this.readyCalendar = true
    this.loading = false
  }

  getMyCompanie() {
    this.loading = true
    this.companieService.getCompanie('', {})
      .subscribe(
        res => {
          this.myCompanie = res
          this.initCalendar()
        },
        error => {
          console.log(error);
          this.loading = false
        }
      )
  }

  getUserCalendarBySearch(searchData: SearchData) {
    this.searchData = searchData
    this.isSearchInitReady = true
    this.resetSearchGetUserCalendars()
  }
  resetSearchGetUserCalendars() {
    // this.search.typeUser = this.searchData.typeUser
    // this.search.userId = ''
    // this.search.projectSearch = ''
    this.search.userId = '';
    this.searchData.fetchedUserSearchs.forEach(fetchedUserSearch => {
      this.search.userId = fetchedUserSearch._id
    });
    // this.searchData.fetchedProjectSearchs.forEach(fetchedProjectSearch => {
    //   this.search.projectSearch = fetchedProjectSearch._id
    // });
    // this.search.typeUser = searchData.search.typeUser
    // this.search.userSearch = searchData.search.userSearch
    // this.search.projectSearch = searchData.search.projectSearch
    const tempSearch: Search = Object.assign({}, this.search)
    if (!this.showCustomerData) {
      tempSearch.clientId = ''
    }
    this.getUserCalendars(1, tempSearch)
  }


  getUserCalendars(page: number, search: any) {
    // this.globalEventsManager.isLoadding(true);
    // console.log(search)
    this.userCalendarService.getUserCalendars(page, search)
      .subscribe(
      res => {
        // this.globalEventsManager.isLoadding(false);
        this.events = []
        this.events = res.data
        this.events.forEach((event, i) => {
          // this.events[i].content = 'toto'

          // this.events[i].title += '<button type="button">alan</button>';

          event.clients.forEach((user, j) => {
            this.events[i].title = '';
            this.events[i].color = user.profile.colorCalendar
            this.events[i].title += user.profile.lastName + ' '+ user.profile.name + '  '
            // user.profile.address.forEach(singleAddress => {
            //   this.events[i].title += singleAddress.zip
            //   this.events[i].title += ' ';
            //   this.events[i].title += singleAddress.city
            // })
          });
          event.assignedTos.forEach((assignedTo, j) => {
            this.events[i].color = assignedTo.profile.colorCalendar
            this.events[i].title += ' Réparateur: ' + assignedTo.profile.lastName + ' '+ assignedTo.profile.name + '  '
          });
        })
        this.updateCalendar()
      },
      error => {
        // this.globalEventsManager.isLoadding(false);
        console.log(error);
      }
      );
  }


  updateCalendar() {
    let dataSource = {
      id: 1,
      events: this.events
    }
    // $(this.myCal.nativeElement).fullCalendar('refetchEvents')
    this.myCalendar.fullCalendar('removeEventSources');
    this.myCalendar.fullCalendar('addEventSource', dataSource);

  }


  openDialog(userCalendar: UserCalendar) {
    // console.log(this.search)
    const dialogRef = this.dialog.open(UserCalendarDialogComponent, {
      data: {
        search: this.search,
        fetchedUserCalendar: userCalendar
      }
    });
    // dialogRef.componentInstance.fetchedUserCalendar = userCalendar;
    dialogRef.afterClosed().subscribe(result => {
      this.resetSearchGetUserCalendars()
      // this.getUserCalendars(1, this.search)
      // if(result) {
      //   this.fetchedCompanie.forms.push(result)
      // }
    })
  }

  saveSingleEvent(userCalendar: UserCalendar) {
    // this.globalEventsManager.isLoadding(true);
    if (userCalendar._id) {
      this.userCalendarService.updateUserCalendar(userCalendar)
        .subscribe(
        res => {
          // this.globalEventsManager.isLoadding(false);
          // this.authService.successNotif(res.message)
        },
        error => {
          // this.toastr.error('error!', error)
         }
        )
    } else {
      this.userCalendarService.saveUserCalendar(userCalendar)
        .subscribe(
        res => {
          // this.globalEventsManager.isLoadding(false);
          this.authService.successNotif(res.message)
        },
        error => { console.log(error) }
        )
    }
  }


  dayClick(event, jsEvent, view) {
    // console.log('dayClick')
  }

  eventMouseover(event, jsEvent, view) {
    // console.log('eventMouseover')
    // console.log(event, jsEvent, view )
  }
  eventMouseout(event, jsEvent, view) {
    // console.log('eventMouseout')
    // console.log(event, jsEvent, view )
  }
  select(start, end, jsEvent, view) {
    const newUserCalendar = new UserCalendar()
    newUserCalendar.start = start._d
    newUserCalendar.end = end._d
    // newUserCalendar.clients = [{_id: this.search.clientId}]
    this.openDialog(newUserCalendar)
  }
  eventClick(event, jsEvent, view) {
    // console.log(event)
    // console.log(jsEvent)
    if (this.modeInput) {
      this.openDialog(event)
    }

  }
  unselect(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDragStart(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDragStop(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventDrop(event, delta, revertFunc, jsEvent, ui, view) {

    let extraMS: number = delta._milliseconds * 1 + delta._days * 24 * 60 * 60 * 1000
    let newUserCalendar: UserCalendar = this.events.find(x => x._id === event._id)
    newUserCalendar.start = new Date(new Date(newUserCalendar.start).getTime() + extraMS)
    newUserCalendar.end = new Date(new Date(newUserCalendar.end).getTime() + extraMS)
    this.saveSingleEvent(newUserCalendar)

  }
  viewRender(view, element) {
    // console.log(new Date(view.activeRange.start))
    this.search.startDate = new Date(view.intervalStart)
    this.search.endDate = new Date(view.intervalEnd)
    // this.search.startDate = new Date(view.activeRange.start)
    // this.search.endDate = new Date(view.activeRange.end)
    // if (this.isSearchInitReady) {
    // console.log('resetSearchGetUserCalendars')
      this.resetSearchGetUserCalendars()
    // }
    // this.getUserCalendars(1, this.search)
    // console.log(view)
  }
  eventRender(event, element, view ) {
    // const this2 = this
    // element.bind('dblclick', function() {
    // // alert('double click!');
    //   this2.openDialog(event)
    // });

    // console.log(element)
    // element = {}
    // element.find('.fc-title').prepend('<span class="glyphicon">ALAN</span> ');
    // var title = element.find( '.fc-title' );
    // title.html( title.text() );
    // element.innerHTML = 'toto'
    // element.find('span.fc-event-title').html('toto');
  }
  eventResizeStart(event, jsEvent, view) {
    // console.log('unselect')
    // console.log(event, jsEvent, view )
  }
  eventResizeStop(event, jsEvent, view) {
    // console.log(event)
    // console.log(event, jsEvent, view )
  }
  eventResize(event, delta, revertFunc, jsEvent, ui, view) {
    let extraMS: number = delta._milliseconds * 1 + delta._days * 24 * 60 * 60 * 1000
    let newUserCalendar: UserCalendar = this.events.find(x => x._id === event._id)
    // newUserCalendar.start = new Date(new Date(newUserCalendar.start).getTime() + extraMS)
    newUserCalendar.end = new Date(new Date(newUserCalendar.end).getTime() + extraMS)
    this.saveSingleEvent(newUserCalendar)
  }





}
