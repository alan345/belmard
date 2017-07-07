import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import { Observable} from 'rxjs';
import { ToastsManager} from 'ng2-toastr';
import { UserService} from '../user.service'
import { User } from '../user.model'




@Injectable()
export class PaiementGuardService implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastsManager,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let answer: boolean
    this.userService.getUser('')
      .subscribe(
        res => {
          let currentUser: User = res
          console.log(new Date( currentUser.paiement.stripe.current_period_end) )
          console.log(typeof new Date())
          if (new Date(currentUser.paiement.stripe.current_period_end) > new Date()) {
            console.log('s')
            answer= true;
          } else {
            console.log('s')
            answer = false
          }
        },
        error => { console.log(error) }
      )
      if(answer) {
        return true
      } else {
        this.toastr.error('Check your paiement!');
        this.router.navigate(['/user/paiement']);
      }
  }
}
