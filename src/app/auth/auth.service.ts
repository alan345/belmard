import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {User} from './user.model';
import {Observable} from 'rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import {ToastsManager} from 'ng2-toastr';
import {ErrorService} from '../errorHandler/error.service';
import {Reset} from './resetPassword';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

@Injectable()

export class AuthService {
  public token: string;
  public currentUser={
    userId: '',
    token: '',
    // user: {}
  //  companieId:[]

  }
  jwtHelper: JwtHelper = new JwtHelper();
  //public userId: string;


  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private router: Router) {
      // set token if saved in local storage
      //console.log('AuthService called')
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.currentUser = currentUser;
  }

  // sending request to back end to register our user
  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/register', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request to back end to login the user
  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/login', body, {headers: headers})
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        let userId = response.json() && response.json().userId;
        let user = response.json() && response.json().user;
        if (token) {

          let currentUser = {
            userId: userId,
            token: token,
            // user: user
          }

          this.token = token
          this.currentUser = currentUser

        //  console.log(this.currentUser)
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }

        // let id_token = response.json() && response.json().token;
        // let userId = response.json() && response.json().userId;
        // this.id_token = id_token
        // this.userId = userId
        //
        //
        //console.log(response)
        return response.json()
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



  isAdmin() {
    let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    if (userInfo) {
      if (userInfo.user.role[0] === 'admin') {
        return true;
      }
    }
    return false;
  }



  getCurrentUser(){
    // console.log(localStorage.getItem('id_token') )
    let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    console.log(userInfo)
    return userInfo.user
    // return userInfo
    // if (userInfo) {
    //   if (userInfo.user.role[0] === 'admin') {
    //     return true;
    //   }
    // }
    // return false;
  }
  isCurrentUserIsInSubPeriod(){
    let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
    if (new Date(userInfo.user.paiement.stripe.current_period_end) > new Date())
      return true;
    return false
  }
  isCurrentUserHasCompanie(){
    let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;

    if(userInfo.user.companies.length)
      return true
    return false
  }

  // isCurrentUserIsInSubPeriod(){
  //   if (new Date(this.currentUser.paiement.stripe.current_period_end) > new Date())
  //     return true;
  //   return false
  //
  // }
  // isCurrentUserHasCompanie(){
  //   if(this.currentUser.companies.length)
  //     return true
  //   return false
  // }

  // isStylist() {
  //   let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
  //   if (userInfo) {
  //     if (userInfo.user.role[0] === 'stylist') {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // isSalesRep() {
  //   let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
  //   if (userInfo) {
  //     if (userInfo.user.role[0] === 'salesRep') {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  //
  // isManager(){
  //   let userInfo = localStorage.getItem('id_token') ? this.jwtHelper.decodeToken(localStorage.getItem('id_token')) : null;
  //   if (userInfo) {
  //     if (userInfo.user.role[0] === 'manager') {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // sending request for password reset
  forget(reset: Reset) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/forgot', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request with the newly created password
  reset(reset: Reset) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/reset/' + reset.token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // logout function to be used in html file of both pages (login/register) in order to clear the localStorage from token and user id.
  logout() {
    localStorage.clear();
    this.token = null;

    // this.router.navigate(['user/login']);
    //gooplus
    //location.reload();

    this.toastr.info('You have been logged out');
  }

  // check if the user is logged in or not, if token is expired, token is deleted from localstorage
  isLoggedIn() {
    if (!tokenNotExpired()) {
      localStorage.clear();
    }
    return tokenNotExpired();
  }
}
