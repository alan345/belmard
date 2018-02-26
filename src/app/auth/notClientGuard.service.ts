import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
// import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class NotClientGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  // we check if the user is logged in or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // user is actually logged in
    if (!this.authService.getCurrentUser().isExternalUser) {
      return true;
      // user is not logged in, return the user to the login page
    } else {
      this.router.navigate(['/quote/list/quote']);
    //  this.toastr.error('Please login first');
    }
  }
}
