import { Component, OnInit} from '@angular/core';
import { UserCalendarService} from './userCalendar.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserCalendar } from './userCalendar.model';
import { FormBuilder} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService} from '../user/user.service';
import { ProjectService} from '../project/project.service';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { TypeUser } from '../user/user.model';
import { Subject } from 'rxjs/Subject';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { AuthService} from '../auth/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-userCalendars',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './userCalendarSingle.component.html',
  styleUrls: ['./userCalendar.component.css'],

})

export class UserCalendarSingleComponent implements OnInit {
//  @ViewChild('modalContent') modalContent: TemplateRef<any>;
    // testcolor = "background-color:#ffff00"
    typeUser = TypeUser
    view: string = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    events: UserCalendar[] = []
  //  activeEvent: UserCalendar = new UserCalendar();
    activeDayIsOpen: boolean = false;
    autocompleteUser: string = '';
    autocompleteProject: string = '';
    fetchedUsers: User[] = [];
    fetchedProjects: Project[] = [];
    currentUser: User = new User();
    timeBegin: number= 9
    timeEnd: number= 19
    search= {
      typeUser:[],
      clientSearch:'',
      userSearch:'',
      projectSearch:'',
      endDate: '',
      startDate: '',
    }


    constructor(
    //  private modal: NgbModal,
      private sanitizer: DomSanitizer,
      private userCalendarService: UserCalendarService,
      private toastr: ToastsManager,
      public dialog: MdDialog,
      private router: Router,
      private location: Location,
      private activatedRoute: ActivatedRoute,
      private _fb: FormBuilder,
      private userService: UserService,
      private projectService: ProjectService,
      private authService: AuthService
    ) {}

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {


        //http://localhost/#/userCalendar;idUserSearch=5954ac1c801cb7430e963d96;idProjectSearch=5953b829801cb7430e963d8a;idClientSearch=5950ba5defcface933c2b72a;typeUserSearch=boulanger
        // console.log(params)

        if(params['idUserSearch']) {this.getUserSearch(params['idUserSearch'])}
        if(params['idProjectSearch']) {this.getProjectSearch(params['idProjectSearch'])}
        if(params['idClientSearch']) {this.getClientSearch(params['idClientSearch'])}
        if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}

        if(params['new']) {
          let this2 = this
          setTimeout(function(){
            this2.clearSelectedEvents()
            this2.addEvent()
            if(params['idUserNew']) { this2.getUser(params['idUserNew']) }
            if(params['idProjectNew']) { this2.getProject(params['idProjectNew']) }
            // if(params['idClientNew']) { this2.getClient(params['idClientNew']) }
            this2.refresh.next();
          }, 800);
        }

      })

      this.fetchEvents();
      this.getCurrentUser();
    }


    getCurrentUser() {
      // this.userService.getUser('')
      //   .subscribe(
      //     res => {
      //       this.currentUser = res
            this.currentUser = this.authService.getCurrentUser()
            this.currentUser.ownerCompanies.forEach(companie => {
              this.timeEnd = companie.option.calendar.timeEnd
              this.timeBegin = companie.option.calendar.timeBegin
            })
        //   },
        //   error => { console.log(error) }
        // )
    }

    fetchCalendarEvents(){
      this.fetchEvents()
    }
    fetchEvents() {
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
      this.search.startDate = format(getStart(this.viewDate), 'YYYY-MM-DD');
      this.search.endDate = format(getEnd(this.viewDate), 'YYYY-MM-DD');
      this.getUserCalendars(1, this.search)
    }


    getUserCalendars(page: number, search: any) {
      this.userCalendarService.getUserCalendars(page, search)
        .subscribe(
          res => {
            this.events = []
            res.data.forEach(event => {
              let newEvent: UserCalendar = new UserCalendar();
              newEvent = event
              newEvent.start = new Date(event.start)
              newEvent.end = new Date(event.end)
              event.users.forEach(user => {
                newEvent.color.primary = user.profile.colorCalendar
              });

              newEvent.isActiveEvent = false
              this.events.push(newEvent)

            });
            this.refresh.next();
          },
          error => {
            console.log(error);
          }
        );
    }

  dayClicked({date, events}: {date: Date, events: UserCalendar[]}): void {
    this.viewDate = date
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(action: string, selectedEvent): void {
    this.clearSelectedEvents()
    this.events.forEach((event, index) => {
        if(selectedEvent._id === event._id) {
          this.events[index].isActiveEvent = true
        }
    })

  }

  clearSelectedEvents() {
    this.events.forEach((event, index) => { this.events[index].isActiveEvent = false })
  }


  saveEvent(event: UserCalendar) {
    if(event._id) {
      this.userCalendarService.updateUserCalendar(event)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            //this.router.navigate(['quote/edit/' + this.fetchedQuote._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.userCalendarService.saveUserCalendar(event)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
              //this.router.navigate(['quote/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }


  deleteEvent(event, index) {
    this.events.splice(index, 1);
    this.refresh.next()
    if(event._id) {
      this.userCalendarService.deleteUserCalendar(event._id)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    }
  }



  addEvent(): void {
    this.clearSelectedEvents()
    let endDate = this.viewDate;
    endDate.setHours(endDate.getHours() + 4);
    // pointeur not value


    let newEvent = new UserCalendar();
    newEvent.title = ''
    newEvent.start = this.viewDate
    newEvent.end = endDate
    newEvent.color = colors.red
    newEvent.isActiveEvent = true
    this.events.push(newEvent)
    let this2 = this
    setTimeout(function(){
        this2.refresh.next();
    }, 5);

  }

// autocolplete typeUser
  fetchedTypeUsers = []
  autocompleteTypeUser: string = '';
  searchTypeUser() {
    if(!this.autocompleteTypeUser) {
      this.fetchedTypeUsers = []
    } else {
      this.fetchedTypeUsers = this.typeUser.filter((el) =>
        el.toLowerCase().indexOf(this.autocompleteTypeUser.toLowerCase()) > -1
      );
    }
  }
  selectTypeUser(typeUser) {
    this.autocompleteTypeUser = '';
    this.fetchedTypeUsers = [];
    this.search.typeUser.push(typeUser);
    this.fetchEvents();
  }
  removeTypeUser(i: number) {
    this.search.typeUser.splice(i, 1);
    this.fetchEvents();
  }
// autocolplete typeUser




selectProjectSearch(projectSearch: Project) {

  this.search.projectSearch = projectSearch._id
  this.fetchEvents();
}

//autocomplete userSearch
  autocompleteUserSearch: string = '';
  fetchedUserSearchs: User[] = [];
  fetchedProjectSearchs: Project[] = [];
  selectUserSearch(userSearch: User) {
    // this.autocompleteUserSearch = '';
    // this.fetchedUserSearchs = []
    this.search.userSearch = userSearch._id
    this.fetchEvents();
  }
  // searchUserSearchs() {
  //   if(!this.autocompleteUserSearch) {
  //     this.fetchedUserSearchs  = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteUserSearch,
  //       };
  //     this.getUserSearchs(1, search);
  //   }
  // }

  getProjectSearch(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProjectSearchs = [res]
          this.selectProjectSearch(res)
        },
        error => { console.log(error) }
      )
  }

  getUserSearch(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUserSearchs = [res]
          this.selectUserSearch(res)
        },
        error => { console.log(error) }
      )
  }
  // getUserSearchs(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //          this.fetchedUserSearchs = res.data
  //          this.refresh.next();
  //       },
  //       error => {console.log(error); }
  //     );
  // }
  removeUserSearch() {
    this.search.userSearch = ''
    this.fetchEvents();
  }
  removeProjectSearch(i: number) {
    this.search.projectSearch = ''
    this.fetchEvents();
  }
  //autocomplete userSearch



//autocomplete clientSearch
  // autocompleteClientSearch: string = '';
  // fetchedClientSearchs: User[] = [];
  selectClientSearch(userSearch: User) {
    // this.autocompleteClientSearch = '';
    // this.fetchedClientSearchs = []
    // this.search.clientSearch.push(userSearch)
    this.fetchEvents();
  }
  // searchClientSearchs() {
  //   if(!this.autocompleteClientSearch) {
  //     this.fetchedClientSearchs = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteClientSearch,
  //       };
  //     this.getClientSearchs(1, search)
  //   }
  // }
  getClientSearch(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.selectClientSearch(res)
        },
        error => { console.log(error) }
      )
  }
  // getClientSearchs(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //          this.fetchedClientSearchs = res.data
  //          this.refresh.next();
  //       },
  //       error => {console.log(error);}
  //     );
  // }
  removeClientSearch(i: number) {
    // this.search.clientSearch.splice(i, 1);
    this.fetchEvents();
  }
//autocomplete clientSearch



//autocomplete projectSearch
  // autocompleteProjectSearch: string = '';
  // fetchedProjectSearchs: Project[] = [];
  // selectProjectSearch(projectSearch: Project) {
  //   this.autocompleteProjectSearch = '';
  //   this.fetchedProjectSearchs = []
  //   this.search.projectSearch.push(projectSearch)
  //   this.fetchEvents();
  // }
  // searchProjectSearchs() {
  //   if(!this.autocompleteProjectSearch) {
  //     this.fetchedProjectSearchs = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteProjectSearch,
  //       };
  //     this.getProjectSearchs(1, search)
  //   }
  // }

  // getProjectSearchs(page: number, search: any) {
  //   this.projectService.getProjects(page, search)
  //     .subscribe(
  //       res => {
  //          this.fetchedProjectSearchs = res.data
  //          this.refresh.next();
  //       },
  //       error => {console.log(error);}
  //     );
  // }

//autocomplete projectSearch



//autocomplete client
  // autocompleteClient: string = '';
  // fetchedClients: User[] = [];
  // selectClient(client: User) {
  //   this.autocompleteClient = ''
  //   this.fetchedClients = []
  //   this.events.forEach(event => {
  //     if(event.isActiveEvent) {
  //       event.clients.push(client)
  //     }
  //   })
  // }
  // searchClients() {
  //   if(!this.autocompleteClient) {
  //      this.fetchedClients = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteClient,
  //       };
  //     this.getClients(1, search)
  //   }
  // }
  // getClient(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         this.selectClient(res)
  //       },
  //       error => { console.log(error) }
  //     )
  // }
  //
  // getClients(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //          this.fetchedClients = res.data
  //          this.refresh.next();
  //       },
  //       error => {console.log(error);}
  //     );
  // }
  // removeClient(i: number) {
  //   this.events.forEach(event => {
  //     if(event.isActiveEvent) {
  //       event.clients.splice(i, 1);
  //     }
  //   })
  // }
//autocomplete client




//autocomplete
  selectUser(user: User) {
    // this.autocompleteUser = ''
    // this.fetchedUsers = []
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.users = [user]
      }
    })
  }
  // searchUsers() {
  //   if(!this.autocompleteUser) {
  //     this.fetchedUsers = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteUser,
  //       };
  //     this.getUsers(1, search);
  //   }
  // }
  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.selectUser(res)
        },
        error => { console.log(error) }
      )
  }
  // getUsers(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //          this.fetchedUsers = res.data
  //          this.refresh.next();
  //       },
  //       error => {console.log(error);}
  //     );
  // }

  //ok
  removeUser(i: number) {
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.users.splice(i, 1);
      }
    })
  }
//autocomplete



//autocomplete
  selectProject(project: Project) {
    // this.autocompleteProject = ''
    // this.fetchedProjects = []
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.projects = [project]
      }
    })
  }
  // searchProjects() {
  //   if(!this.autocompleteProject) {
  //     this.fetchedProjects = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteProject,
  //       };
  //     this.getProjects(1, search);
  //   }
  // }
  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.selectProject(res)
        },
        error => { console.log(error) }
      )
  }
  // getProjects(page: number, search: any) {
  //   this.projectService.getProjects(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedProjects = res.data;
  //         this.refresh.next();
  //       },
  //       error => {console.log(error);}
  //     );
  // }
  removeProject(i: number) {
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.projects.splice(i, 1);
      }
    })
  }
//autocomplete



goBack() {
  this.location.back();
}



}
