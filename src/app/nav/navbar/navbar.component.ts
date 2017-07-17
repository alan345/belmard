import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AdminService} from '../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { CompanieGuardService} from '../../companie/companieGuard.service'
import { PaiementGuardService} from '../../user/paiement/paiementGuard.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() sidenav: any;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: User = new User();

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    // private companieGuardService: CompanieGuardService,
    // private paiementGuardService: PaiementGuardService,
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      //let userId = localStorage.getItem('userId');
      this.getUser('')
    }
  }

  // isCurrentUserIsInSubPeriod(){
  //   return this.userService.isCurrentUserIsInSubPeriod()
  // }

  isCurrentUserIsInSubPeriod(){
    return true;
    // return this.authService.isCurrentUserIsInSubPeriod()
  }
  isCurrentUserHasCompanie(){
    return true;
    // return this.authService.isCurrentUserHasCompanie()
  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        res => { this.fetchedUser = res },
        error => { console.log(error) }
      )
  }


  // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
  // It's called by the (click)='logout()' when the user presses the button
  logout() {
    this.authService.logout();
    let this2 = this
    setTimeout(function(){
        this2.router.navigate(['/user/login']);
    }, 150);

  }
  // sideNavOpen(){
  //   //this.sidenav.open()
  //   this.sidenav.toggle()
  // }
  isAdmin() {
    return this.adminService.isAdmin();
  }
}
