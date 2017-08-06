import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ExpenseService} from '../expense.service';
import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';

import {Expense} from '../expense.model';

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
import { UserCalendar } from '../userCalendar.model';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['../expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  @Input() fetchedQuote:Quote = new Quote()
  fetchedUserCalendar: UserCalendar = new UserCalendar()
  myForm: FormGroup;
  constructor(
    private expenseService: ExpenseService,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
    private userCalendarService: UserCalendarService,
  ) {}

  ngOnInit() {

    this.myForm = this._fb.group({
      title: [''],
      description: [''],
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['idExpense'])
        this.getUserCalenddar(params['idExpense'])

    })
  }

  getUserCalenddar(id: string) {
    this.userCalendarService.getUserCalendar(id)
      .subscribe(
        res => {
          this.fetchedUserCalendar = res

          // this.fetchedExpense
          // .datePaiementString =
          // this.authService
          // .isoDateToHtmlDate(this.fetchedExpense.datePaiement)
        },
        error => {
          console.log(error);
        }
      )
  }



}
