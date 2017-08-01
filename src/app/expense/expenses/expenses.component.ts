import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { ExpenseService} from '../../expense/expense.service';
import { Expense} from '../../expense/expense.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location} from '@angular/common';



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['../../admin/admin.component.css'],
})
export class ExpensesComponent implements OnInit {
  // @Input() userId = '';
  @Input() idQuote = '';
  @Input() showHeader: boolean = true;
  @Output() getExpensesCross: EventEmitter<any> = new EventEmitter();
  @Input() showCreate: boolean = true;

  fetchedExpenses: Expense[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    orderBy : '',
    search: '',
    idQuote:'',
  };

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
  //  private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
  ) {}



  ngOnInit() {
    this.getExpensesInit()
  }


  getExpensesInit(){
    let this2 = this
    setTimeout(function(){
      this2.search.idQuote = this2.idQuote
      this2.search.orderBy = 'name'
      this2.getExpenses(1, this2.search)
    }, 200);
  }
  searchExpenses(){}


  goBack() {
    this.location.back();
  }

  searchInput() {
    this.getExpenses(this.paginationData.currentPage, this.search)
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy
    this.getExpenses(this.paginationData.currentPage, this.search)
  }

  onDelete(id: string) {
    this.expenseService.deleteExpense(id)
      .subscribe(
        res => {
          this.getExpensesInit()
          this.toastr.success('Great!', res.message);
          this.getExpensesCross.emit(this.fetchedExpenses)
          // console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }


  getPage(page: number) {
    this.loading = true;
    this.getExpenses(page, this.search);
  }


  getExpenses(page: number, search: any) {
    this.expenseService.getExpenses(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedExpenses =  res.data
          this.loading = false;
          this.getExpensesCross.emit(this.fetchedExpenses)
        },
        error => {
          console.log(error);
        }
      );
  }


  isAdmin() {
    return this.authService.isAdmin();
  }


}
