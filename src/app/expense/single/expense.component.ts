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





@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['../expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  @Output() newExpenseSaved: EventEmitter<any> = new EventEmitter();
  @Input() showHeader = true;
  @Input() fetchedQuote:Quote = new Quote()

  showPaiements: boolean = false
  fetchedExpense : Expense = new Expense()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []
  fetchedProjects: Project[] = []
  // currentUser: User = new User()
  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  imgSignatureBase64Temp = ''
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []

  myForm: FormGroup;
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' }
]
  constructor(
    private expenseService: ExpenseService,
    private projectService: ProjectService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private productService: ProductService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.fetchedExpense.projects = this.fetchedProjects
    this.myForm = this._fb.group({
      amount: [''],
      type: [''],
      datePaiement: [ null, []],
    })

    this.fetchedExpense
    .datePaiementString =
    this.authService
    .isoDateToHtmlDate(this.fetchedExpense.datePaiement)


    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
      if(params['idExpense'])
        this.getExpense(params['idExpense'])
      if(params['idQuote'])
       this.getProject(params['idProject'])
    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }


    selectProject(project: Project){
      this.fetchedExpense.projects = [project]
    }


    getProject(idProject: string) {
      this.projectService.getProject(idProject)
        .subscribe(
          res => {
            this.fetchedExpense.projects = [res]
          },
          error => { console.log(error) }
        )
    }

  save() {
    this.fetchedExpense.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedExpense.datePaiementString)
    if(this.fetchedExpense._id) {
      this.expenseService.updateExpense(this.fetchedExpense)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.newExpenseSaved.emit()
            this.getExpense(res.obj._id)
            //this.router.navigate(['expense/edit/' + this.fetchedExpense._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.expenseService.saveExpense(this.fetchedExpense)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.newExpenseSaved.emit()
            this.getExpense(res.obj._id)
            // if(this.showHeader)
            //   this.router.navigate(['expense/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }

  }







  goBack() {
    this.location.back();
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.expenseService.deleteExpense(id)
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


  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedExpense._id).then(function(){
          this2.router.navigate(['expense']);
        })

      }
    })
  }




  getExpense(id: string) {
    this.expenseService.getExpense(id, {})
      .subscribe(
        res => {
          this.fetchedExpense = res

          this.fetchedExpense
          .datePaiementString =
          this.authService
          .isoDateToHtmlDate(this.fetchedExpense.datePaiement)
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }



}
