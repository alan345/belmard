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
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
import { UserService} from '../user/user.service';
import { ProjectService} from '../project/project.service';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';

import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { TypeUser } from '../user/user.model';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';


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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './userCalendarSingle.component.html',
  styleUrls: ['./userCalendar.component.css'],

})

export class UserCalendarSingleComponent implements OnInit {


  @ViewChild('modalContent') modalContent: TemplateRef<any>;

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





    search= {
      typeUser:[],
      clientSearch:[],
      userSearch:[],
      projectSearch:[]
    }


      constructor(
        private modal: NgbModal,
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
      ) {
      }



      ngOnInit() {
        this.fetchEvents()
      }



      fetchEvents() {
        console.log('fetchEvents')
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

        const search = {
          'startDate': format(getStart(this.viewDate), 'YYYY-MM-DD'),
          'endDate': format(getEnd(this.viewDate), 'YYYY-MM-DD')
        }

        this.getUserCalendars(1, search)
      }





      getUserCalendars(page: number, search: any) {
        this.userCalendarService.getUserCalendars(page, search)
          .subscribe(
            res => {
              console.log(res)

              this.events = []
              //this.events = res.data


              res.data.forEach(event => {
                let newEvent: UserCalendar = new UserCalendar();
                newEvent = event
                newEvent.start = new Date(event.start)
                newEvent.end = new Date(event.end)
                newEvent.isActiveEvent = false
                this.events.push(newEvent)
                // this.events.push({
                //   _id: event._id,
                //   title: event.title,
                //   start: new Date(event.start),
                //   end: new Date(event.end),
                //   color: event.color,
                //   isActiveEvent:false,
                //   users: event.users,
                //   clients:event.clients,
                //   draggable: true,
                //   resizable: {
                //     beforeStart: true,
                //     afterEnd: true
                //   }
                // })
              });
              this.refresh.next();
              // let this2 = this
              // setTimeout(function(){
              //     this2.refresh.next();
              // }, 20);


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
        //    this.activeEvent = event
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
      var endDate = this.viewDate;
      endDate.setHours(endDate.getHours() + 4);
      let newEvent = new UserCalendar();
      newEvent.title = 'New event'
      newEvent.start = this.viewDate
      newEvent.end = endDate
      newEvent.color = colors.red
      newEvent.isActiveEvent = true
      this.events.push(newEvent)



    let this2 = this
    setTimeout(function(){
        this2.refresh.next();
    }, 20);

    }


  save() {}




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
    }
    removeTypeUser(i: number) {
      this.search.typeUser.splice(i, 1);
    }
  // autocolplete typeUser




  //autocomplete userSearch
    autocompleteUserSearch: string = '';
    fetchedUserSearchs: User[] = [];
    selectUserSearch(userSearch: User) {
      this.autocompleteUserSearch = '';
      this.fetchedUserSearchs = []
      this.search.userSearch.push(userSearch)
    }
    searchUserSearchs() {
      if(!this.autocompleteUserSearch) {
        this.fetchedUserSearchs  = []
      } else {
        let search = {
            search: this.autocompleteUserSearch,
          };
        this.getUserSearchs(1, search);
      }
    }

    getUserSearchs(page: number, search: any) {
      this.userService.getUsers(page, search)
        .subscribe(
          res => {
             this.fetchedUserSearchs = res.data
             this.refresh.next();
          },
          error => {console.log(error); }
        );
    }
    removeUserSearch(i: number) {
      this.search.userSearch.splice(i, 1);
    }
  //autocomplete userSearch




//autocomplete clientSearch
  autocompleteClientSearch: string = '';
  fetchedClientSearchs: User[] = [];
  selectClientSearch(userSearch: User) {
    this.autocompleteClientSearch = '';
    this.fetchedClientSearchs = []
    this.search.clientSearch.push(userSearch)
  }
  searchClientSearchs() {
    if(!this.autocompleteClientSearch) {
      this.fetchedClientSearchs = []
    } else {
      let search = {
          search: this.autocompleteClientSearch,
        };
      this.getClientSearchs(1, search)
    }
  }
  getClientSearchs(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
           this.fetchedClientSearchs = res.data
           this.refresh.next();
        },
        error => {console.log(error);}
      );
  }
  removeClientSearch(i: number) {
    this.search.clientSearch.splice(i, 1);
  }
//autocomplete clientSearch





//autocomplete projectSearch
  autocompleteProjectSearch: string = '';
  fetchedProjectSearchs: Project[] = [];
  selectProjectSearch(projectSearch: Project) {
    this.autocompleteProjectSearch = '';
    this.fetchedProjectSearchs = []
    this.search.projectSearch.push(projectSearch)
  }
  searchProjectSearchs() {
    if(!this.autocompleteProjectSearch) {
      this.fetchedProjectSearchs = []
    } else {
      let search = {
          search: this.autocompleteProjectSearch,
        };
      this.getProjectSearchs(1, search)
    }

  }
  getProjectSearchs(page: number, search: any) {
    this.projectService.getProjects(page, search)
      .subscribe(
        res => {
           this.fetchedProjectSearchs = res.data
           this.refresh.next();
        },
        error => {console.log(error);}
      );
  }
  removeProjectSearch(i: number) {
    this.search.projectSearch.splice(i, 1);
  }
//autocomplete projectSearch







//autocomplete client
  autocompleteClient: string = '';
  fetchedClients: User[] = [];
  selectClient(client: User) {
    this.fetchedClients = []
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.clients.push(client)
        this.saveEvent(event)
      }
    })
  }
  searchClients() {
    let search = {
        search: this.autocompleteClient,
      };
    this.getClients(1, search)
  }

  getClients(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
           this.fetchedClients = res.data
           this.refresh.next();
        },
        error => {console.log(error);}
      );
  }
  removeClient(i: number) {
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.clients.splice(i, 1);
        this.saveEvent(event)
      }
    })
  }
//autocomplete client




//autocomplete
  selectUser(user: User) {
    this.fetchedUsers = []
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.users.push(user)
        this.saveEvent(event)
      }
    })
  }
  searchUsers() {
    let search = {
        search: this.autocompleteUser,
      };
    this.getUsers(1, search)
  }
  // getUser(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {this.selectUser(res.user)},
  //       error => {console.log(error);}
  //     );
  // }

  getUsers(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
           this.fetchedUsers = res.data
           this.refresh.next();
        },
        error => {console.log(error);}
      );
  }
  removeUser(i: number) {
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.users.splice(i, 1);
        this.saveEvent(event)
      }
    })
  }
//autocomplete



//autocomplete
  selectProject(project: Project) {
    this.fetchedProjects = []
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.projects.push(project)
        this.saveEvent(event)
      }
    })
  }
  searchProjects() {
    let search = {
        search: this.autocompleteProject,
      };
    this.getProjects(1, search)
  }
  // getProject(id: string) {
  //   this.projectService.getProject(id)
  //     .subscribe(
  //       res => {this.selectProject(res.project)},
  //       error => {console.log(error);}
  //     );
  // }

  getProjects(page: number, search: any) {
    this.projectService.getProjects(page, search)
      .subscribe(
        res => {
          this.fetchedProjects = res.data;
          this.refresh.next();
        },
        error => {console.log(error);}
      );
  }
  removeProject(i: number) {
    this.events.forEach(event => {
      if(event.isActiveEvent) {
        event.projects.splice(i, 1);
        this.saveEvent(event)
      }
    })
  }
//autocomplete



  goBack() {
    this.location.back();
  }

  // openDialog(positionImage: string) {
  //   let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       console.log(result)
  //       this.fetchedUserCalendar.forms.push( result)
  //     }
  //   })
  // }

  //
  // save() {
  //
  //   this.fetchedUserCalendar.categorie.categ1 = [{name: this.categ1}]
  //   this.fetchedUserCalendar.categorie.categ2 = [{name: this.categ2}]
  //   this.fetchedUserCalendar.categorie.categ3 = [{name: this.categ3}]
  //
  //
  //
  //   if(this.fetchedUserCalendar._id) {
  //
  //
  //     this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
  //       .subscribe(
  //         res => {
  //           this.toastr.success('Great!', res.message)
  //           this.router.navigate(['userCalendar/' + res.obj._id]);
  //         },
  //         error => {console.log(error)}
  //       );
  //   } else {
  //
  //     this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
  //       .subscribe(
  //         res => {
  //           this.toastr.success('Great!', res.message)
  //           this.router.navigate(['userCalendar/' + res.obj._id]);
  //         },
  //         error => {console.log(error)}
  //       );
  //   }
  // }

  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedUserCalendar._id).then(function(){
  //         this2.router.navigate(['user']);
  //       })
  //
  //     }
  //   })
  // }


  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedUserCalendar.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard2[indexHard].selected = true
  //       }
  //     })
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard1[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.fetchedUserCalendar.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userCalendarService.deleteUserCalendar(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }


}
