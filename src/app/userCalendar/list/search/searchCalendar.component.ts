import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UserCalendarService} from '../../userCalendar.service';
import {SearchData} from '../../userCalendar.model';
import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService} from '../../../user/user.service';
import { User } from '../../../user/user.model';
//
// import { DeleteDialog } from '../../../deleteDialog/deleteDialog.component';
// import { FormBuilder, FormGroup} from '@angular/forms';
// import { Quote } from '../../quote/quote.model';
// import { Product } from '../../product/product.model';
// import { Project } from '../../project/project.model';
// import { ProjectService} from '../../../project/project.service';

// import {CalendarComponent} from 'ap-angular2-fullcalendar';
// import {ToastsManager} from 'ng2-toastr';
// import {Search} from '../../../shared/shared.model'
// import { UserCalendarDialogComponent } from '../single/dialog/userCalendarDialog.component';

// import * as $ from 'jquery';

@Component({
  selector: 'app-user-calendarSearch',
  templateUrl: './searchCalendar.component.html',
  styleUrls: ['../../userCalendar.component.css'],
})
export class SearchCalendarComponent implements OnInit {
  @Output() getUserCalendarBySearch: EventEmitter<any> = new EventEmitter();
  currentUser: User = new User();
  searchData: SearchData = new SearchData();

  // @Output() newUserCalendarSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showHeader = true;
  // @Input() fetchedQuote: Quote = new Quote()

  // @ViewChild('myCal', { read: ElementRef }) myCal: ElementRef;

  //
  // showPaiements = false;
  // fetchedUserCalendar: UserCalendar = new UserCalendar()
  // autocompleteUser = '';
  // autocompleteProject = '';
  // fetchedProducts: Product[] = []
  // fetchedProjects: Project[] = []
  // imgLogoUrl = './assets/images/profile-placeholder.jpg'
  // imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  // search = {
  //   typeUser: [],
  //   // clientSearch: '',
  //   userSearch: '',
  //   projectSearch: '',
  //   // endDate: new Date(),
  //   // startDate: new Date(),
  // }
  // events: UserCalendar[] = []
  // events: UserCalendar[] = []
  // myForm: FormGroup;
  // autocompleteProduct = ''
  // fetchedUsers: User[] = [];
  // arrayContentToSearch = []
  //
  //
  //
  // fetchedUserSearchs: User[] = [];
  // fetchedProjectSearchs: Project[] = [];
  // typeUsers = ['plombier', 'electricien']



  constructor(
    private userService: UserService,
    private userCalendarService: UserCalendarService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    // private _fb: FormBuilder,
    // private projectService: ProjectService,
    // private toastr: ToastsManager,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser()
  }

  // ngAfterViewInit() {
  //
  // }
  calendarInitialized() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(Object.keys(params).length === 0 && params.constructor === Object) {
        // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
        this.getUserCalendarBySearch.emit(this.searchData)
      } else {
        if (params['idUserSearch']) { this.getUserSearch(params['idUserSearch']) }
        // if (params['idProjectSearch']) { this.getProjectSearch(params['idProjectSearch']) }
      }


      // if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}
    })
  }
  //
  // getProjectSearch(id: string) {
  //   this.projectService.getProject(id)
  //     .subscribe(
  //     res => {
  //       // this.search.projectSearch = id
  //       this.searchData.fetchedProjectSearchs = [res]
  //       // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
  //       this.getUserCalendarBySearch.emit(this.searchData)
  //       // this.selectProjectSearch(res)
  //     },
  //     error => { console.log(error) }
  //     )
  // }

  getUserSearch(id: string) {
    this.userService.getUser(id)
      .subscribe(
      res => {
        // this.search.userSearch = id
        this.searchData.fetchedUserSearchs = [res]
        // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
        this.getUserCalendarBySearch.emit(this.searchData)
      },
      error => { console.log(error) }
      )
  }
  // selectUserSearch(userSearch: User) {
  selectUserSearch() {
    // this.autocompleteUserSearch = '';
    // this.fetchedUserSearchs = []
    // this.search.userSearch = userSearch._id
    // console.log(this.search)
    // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
    this.getUserCalendarBySearch.emit(this.searchData)

  }
  selectProjectSearch() {
    // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
    this.getUserCalendarBySearch.emit(this.searchData)
  }
  changeTypeUsers() {
    this.getUserCalendarBySearch.emit(this.searchData)
  }

  removeUserSearch() {
    // this.search.userSearch = ''
    // let searchData = { fetchedUserSearchs: this.fetchedUserSearchs, fetchedProjectSearchs: this.fetchedProjectSearchs}
    this.getUserCalendarBySearch.emit(this.searchData)
  }
  // autocolplete typeUser
  //  fetchedTypeUsers = []
  //  autocompleteTypeUser = '';
  //  searchTypeUser() {
  //    if(!this.autocompleteTypeUser) {
  //      this.fetchedTypeUsers = []
  //    } else {
  //      this.fetchedTypeUsers = this.typeUser.filter((el) =>
  //        el.toLowerCase().indexOf(this.autocompleteTypeUser.toLowerCase()) > -1
  //      );
  //    }
  //  }
  //  selectTypeUser(typeUser) {
  //    this.autocompleteTypeUser = '';
  //    this.fetchedTypeUsers = [];
  //    this.search.typeUser.push(typeUser);
  //    this.fetchEvents();
  //  }
  //  removeTypeUser(i: number) {
  //    this.search.typeUser.splice(i, 1);
  //    this.fetchEvents();
  //  }
  // autocolplete typeUser
  // clearTypeUser() {
  //  this.searchData.typeUser = undefined;
  //  this.changeTypeUsers()
  // }

}
