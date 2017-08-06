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
  @Input() fetchedUserCalendar:UserCalendar = new UserCalendar()
  // fetchedUserCalendar: UserCalendar = new UserCalendar()
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
  selectUser(user: User) {
    this.fetchedUserCalendar.users = [user]
  }
  selectProject(project: Project) {
    this.fetchedUserCalendar.projects = [project]
  }
  removeProject(i: number) {
    this.fetchedUserCalendar.projects.splice(i, 1);
  }
  removeUser(i: number) {
    this.fetchedUserCalendar.users.splice(i, 1);
  }
  getUserCalenddar(id: string) {
    this.userCalendarService.getUserCalendar(id)
      .subscribe(
        res => {
          this.fetchedUserCalendar = res
        },
        error => {
          console.log(error);
        }
      )
  }

  openDialogDelete() {
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(this.fetchedUserCalendar._id).then(function(){
          // this2.router.navigate(['paiementQuote']);
        })

      }
    })
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


    save() {
      if(this.fetchedUserCalendar._id) {
        this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
            },
            error => {
              this.toastr.error('error!', error)
            }
          )
      } else {
        this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              this.toastr.success('Great!', res.message)
            },
            error => {console.log(error)}
          )
      }
    }

}
