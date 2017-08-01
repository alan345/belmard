import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Expense} from './expense.model';
import {ToastsManager} from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ExpenseService {


  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  private expensesForCurrentUser: Expense[] = [];
  private singleExpense = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}


  getExpensesGraph(year: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'expense/graph/' + year , options)
      .timeout(5000)
      .map((response: Response) => {
        const expenses = response.json();
        return expenses;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getExpenses(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'expense/page/' + page , options)
      .timeout(5000)
      .map((response: Response) => {
        const expenses = response.json();
        return expenses;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //
  // getExpenseForCurrentUser() {
  //   // if(this.expensesForCurrentUser.length) {
  //   //   return Observable.of(this.expensesForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'expense/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.expensesForCurrentUser = response.json().item
  //   //       return this.expensesForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'expense/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getExpenseByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'expense/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getExpense(id: string, search: any) : Observable<Expense> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'expense/' + id, options)
      .map((response: Response) => {
        return response.json().item;
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteExpense(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'expense/' + id, {headers: headers})
      .map((response: Response) => {
      //  console.log("delete",response)
        return response.json();
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  saveExpense(expense: Expense) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete expense._id;
    const body = JSON.stringify(expense);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'expense/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateExpense(expense: Expense) {
    const body = JSON.stringify(expense);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'expense/' + expense._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
