import { Component, OnInit} from '@angular/core';
import { UserCalendarService} from './userCalendar.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserCalendar, ItemSteps, StatusUserCalendar } from './userCalendar.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
import { UserService} from '../user/user.service';
import { QuoteService} from '../quote/quote.service';

import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';



@Component({
  selector: 'app-userCalendars',
  templateUrl: './userCalendarSingle.component.html',
  styleUrls: ['./userCalendar.component.css'],

})

export class UserCalendarSingleComponent implements OnInit {



  userCalendarOptions = {
    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
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
