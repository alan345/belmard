import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { ToastsManager} from 'ng2-toastr';
import { UserService} from '../user/user.service'
import { User } from '../user/user.model'







@Injectable()
export class CompanieGuardService implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastsManager,
    private userService: UserService
  ) {
    // this.getCurrentUser()
  }

  fetchedCurrentUser: User = new User()

  // we check if the user is an Administrator or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let answer:boolean
    this.userService.getUser('')
      .subscribe(
        res => {
          this.fetchedCurrentUser = res
          // console.log(this.fetchedCurrentUser)
          if (this.fetchedCurrentUser.companies.length) {
            answer= true;
          } else {
            answer = false
            // this.router.navigate(['/companie']);
          }
        },
        error => { console.log(error) }
      )
      if(answer) {
        return true
      } else {
        this.router.navigate(['/companie/new']);
      }



  }
}
