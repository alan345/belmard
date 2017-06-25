import { Component, OnInit} from '@angular/core';
import { UserCalendarService} from './userCalendar.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserCalendar, ItemSteps, StatusUserCalendar } from './userCalendar.model';
import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
import { UserService} from '../user/user.service';
import { QuoteService} from '../quote/quote.service';

import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

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


    view: string = 'month';

    viewDate: Date = new Date();

    modalData: {
      action: string,
      event: CalendarEvent
    };

    actions: CalendarEventAction[] = [{
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: {event: CalendarEvent}): void => {
        this.handleEvent('Edited', event);
      }
    }, {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: {event: CalendarEvent}): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [{
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    }, {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    }, {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    }, {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }];

    activeDayIsOpen: boolean = true;



    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

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

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
      // this.modalData = {event, action};
      // this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
      this.events.push({
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });
      this.refresh.next();
    }





  selectedIndex1 = 0
  selectedIndex2 = 0
  show1 = false
  show2 = false
  categ1: string = '';
  categ2: string = '';
  categ3: string = '';
  itemSteps = ItemSteps;


  status = StatusUserCalendar
  categ: string = 'Electricité';
  subCateg: string = 'file';
  autocompleteUser: string = '';
  autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  fetchedQuotes: Quote[] = [];


  fetchedUserCalendar: UserCalendar = new UserCalendar();


  public myForm: FormGroup;

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
    private quoteService: QuoteService,
  ) {
  }



  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getUserCalendar(params['id'])

      if(params['idClient'])
       this.getUser(params['idClient'])
    })
  }

  selectUser(user: User) {
    this.fetchedUsers = []
    this.fetchedUserCalendar.clients.push(user)
    this.save()
  }

  searchUsers() {
    let search = {
        search: this.autocompleteUser,
      };
    this.getUsers(1, search)
  }
  changeCascade(selectedIndex1, selectedIndex2) {

    this.selectedIndex1 = selectedIndex1
    this.selectedIndex2 = selectedIndex2

  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          //this.fetchedUsers[0] = res.user
          this.selectUser(res.user)
        },
        error => {
          console.log(error);
        }
      );
  }

  getUsers(page: number, search: any) {
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
          this.fetchedUsers = res.data
        },
        error => {
          console.log(error);
        }
      );
  }

  removeUser(i: number) {
    this.fetchedUserCalendar.clients.splice(i, 1);
    this.save()
  }


  goBack() {
    this.location.back();
  }

  openDialog(positionImage: string) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result)
        this.fetchedUserCalendar.forms.push( result)
      }
    })
  }


  save() {

    this.fetchedUserCalendar.categorie.categ1 = [{name: this.categ1}]
    this.fetchedUserCalendar.categorie.categ2 = [{name: this.categ2}]
    this.fetchedUserCalendar.categorie.categ3 = [{name: this.categ3}]



    if(this.fetchedUserCalendar._id) {


      this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['userCalendar/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {

      this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['userCalendar/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    }
  }

  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedUserCalendar._id).then(function(){
          this2.router.navigate(['user']);
        })

      }
    })
  }


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




  getUserCalendar(id : string) {
    this.userCalendarService.getUserCalendar(id)
      .subscribe(
        res => {
          this.fetchedUserCalendar = <UserCalendar>res

          if(this.fetchedUserCalendar.categorie.categ1.length)
            this.categ1 = this.fetchedUserCalendar.categorie.categ1[0].name
          if(this.fetchedUserCalendar.categorie.categ2.length)
            this.categ2 = this.fetchedUserCalendar.categorie.categ2[0].name
          if(this.fetchedUserCalendar.categorie.categ3.length)
            this.categ3 = this.fetchedUserCalendar.categorie.categ3[0].name

          let categ1Index:number = 0
          let categ2Index:number = 0
          this.itemSteps.forEach((categ1,index) => {
            if(categ1.categ === this.categ1)
              categ1Index = index
          })
          this.itemSteps[categ1Index].subCateg.forEach((categ2,index) => {
            if(categ2.categ === this.categ2)
              categ2Index = index
          })
          this.changeCascade(categ1Index, categ2Index)
          //this.fetchedUserCalendar.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/userCalendar/' + res.embed )
          //this.fetchedUserCalendar.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)
          // this.fetchedUserCalendar.categories.forEach((categorie) => {
          //   //this.addCategorie()
          // })
          //this.refreshHardCategories()
        },
        error => {
          console.log(error);
        }
      )
  }


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
