import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Injectable, NgModule} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserCalendarService} from '../userCalendar.service';

import {UserCalendar} from '../userCalendar.model';
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
import { ProjectService} from '../../project/project.service';

import {CalendarComponent} from 'ap-angular2-fullcalendar';

import { UserCalendarDialogComponent } from '../single/dialog/userCalendarDialog.component';

// import * as $ from 'jquery';

@Component({
  selector: 'app-userCalendarSearch',
  templateUrl: './searchCalendar.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class SearchCalendarComponent implements OnInit {
  @Output() getUserCalendarBySearch: EventEmitter<any> = new EventEmitter();

  // @Output() newUserCalendarSaved: EventEmitter<any> = new EventEmitter();
  // @Input() showHeader = true;
  // @Input() fetchedQuote: Quote = new Quote()

  // @ViewChild('myCal', { read: ElementRef }) myCal: ElementRef;

  //
  // showPaiements: boolean = false
  // fetchedUserCalendar: UserCalendar = new UserCalendar()
  // autocompleteUser: string = '';
  // autocompleteProject: string = '';
  // fetchedProducts: Product[] = []
  // fetchedProjects: Project[] = []
  // // currentUser: User = new User()
  // imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  // imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  search = {
    typeUser: [],
    // clientSearch: '',
    userSearch: '',
    projectSearch: '',
    // endDate: new Date(),
    // startDate: new Date(),
  }
  // events: UserCalendar[] = []
  // events: UserCalendar[] = []
  // myForm: FormGroup;
  // autocompleteProduct: String = ''
  // fetchedUsers: User[] = [];
  // arrayContentToSearch = []
  //
  //
  //
  fetchedUserSearchs: User[] = [];
  fetchedProjectSearchs: Project[] = [];




  constructor(
    private userService: UserService,
    private userCalendarService: UserCalendarService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private projectService: ProjectService,
    // private authService: AuthService,
  ) { }

  ngOnInit(){}

  ngAfterViewInit() {

  }
  calendarInitialized() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(Object.keys(params).length === 0 && params.constructor === Object) {
          this.getUserCalendarBySearch.emit(this.search, this.fetchedUserSearchs, this.fetchedProjectSearchs)
      } else {
        if (params['idUserSearch']) { this.getUserSearch(params['idUserSearch']) }
        if (params['idProjectSearch']) { this.getProjectSearch(params['idProjectSearch']) }
      }


      // if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}
    })
  }

  getProjectSearch(id: string) {
    this.projectService.getProject(id)
      .subscribe(
      res => {
        this.search.projectSearch = id
        this.fetchedProjectSearchs = [res]
        this.getUserCalendarBySearch.emit(this.search, this.fetchedUserSearchs, this.fetchedProjectSearchs)
        // this.selectProjectSearch(res)
      },
      error => { console.log(error) }
      )
  }

  getUserSearch(id: string) {
    this.userService.getUser(id)
      .subscribe(
      res => {
        this.search.userSearch = id
        this.fetchedUserSearchs = [res]
        this.getUserCalendarBySearch.emit(this.search, this.fetchedUserSearchs, this.fetchedProjectSearchs)
      },
      error => { console.log(error) }
      )
  }
  selectUserSearch(userSearch: User) {
    // this.autocompleteUserSearch = '';
    // this.fetchedUserSearchs = []
    this.search.userSearch = userSearch._id
    console.log(this.search)
    this.getUserCalendarBySearch.emit(this.search, this.fetchedUserSearchs, this.fetchedProjectSearchs)

  }


  removeUserSearch() {
    this.search.userSearch = ''
    this.getUserCalendarBySearch.emit(this.search, this.fetchedUserSearchs, this.fetchedProjectSearchs)
  }
  // autocolplete typeUser
  //  fetchedTypeUsers = []
  //  autocompleteTypeUser: string = '';
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


}
