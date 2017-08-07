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


import {CalendarComponent} from 'ap-angular2-fullcalendar';

import { UserCalendarDialogComponent } from '../single/dialog/userCalendarDialog.component';

// import * as $ from 'jquery';

@Component({
  selector: 'app-userCalendarSearch',
  templateUrl: './searchCalendar.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class SearchCalendarComponent implements OnInit {
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
  // search = {
  //   typeUser: [],
  //   clientSearch: '',
  //   userSearch: '',
  //   projectSearch: '',
  //   endDate: new Date(),
  //   startDate: new Date(),
  // }
  // events: UserCalendar[] = []
  // events: UserCalendar[] = []
  // myForm: FormGroup;
  // autocompleteProduct: String = ''
  // fetchedUsers: User[] = [];
  // arrayContentToSearch = []
  //
  //
  //
  // fetchedUserSearchs: User[] = [];




  constructor(
    private userService: UserService,
    private userCalendarService: UserCalendarService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    // private authService: AuthService,
  ) { }
  onCalendarInit() {
    // this.getUserCalendarsInit()
    // console.log('Calendar initialized');
  }

  getUserCalendarsInit() {
    // this.getUserCalendars(1, this.search)
  }
  ngOnInit() {
  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     // if(params['idUserSearch']) {this.getUserSearch(params['idUserSearch'])}
  //   // if(params['idProjectSearch']) {this.getProjectSearch(params['idProjectSearch'])}
  //   // if(params['idClientSearch']) {this.getClientSearch(params['idClientSearch'])}
  //   // if(params['typeUserSearch']) {this.selectTypeUser(params['typeUserSearch'])}
  // })
  }

  getUserSearch(id: string) {
  // this.userService.getUser(id)
  //   .subscribe(
  //     res => {
  //       this.fetchedUserSearchs = [res]
  //     },
  //     error => { console.log(error) }
  //   )
}





}
