import { Component, OnInit, Input} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { AdminService} from '../../admin/services/admin.service';
import { ProfileService} from '../../user/profile/profile.service';
import { Router} from '@angular/router';
import { CompanieService} from '../../companie/companie.service';
import { Companie } from '../../companie/companie.model';

@Component({
  selector: 'app-sideNavbar',
  templateUrl: './sideNavbar.component.html',
  styleUrls: ['./sideNavbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Input() sidenav: any
  showAdminMenu: boolean = false;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: any = {
    _id: ''
  };
  companies: Companie[] = []
  userBelongToHQ : boolean = false

  HQCompanie: Companie = new Companie();

  search = {
    orderBy : 'name',
    search: '',
    typeCompanie:'HQ',
  }
  constructor(
      private authService: AuthService,
      private adminService: AdminService,
      private profileService: ProfileService,
      private router: Router,
      private companieService: CompanieService) {
  }

  ngOnInit() {
    this.refresh()
  }

  toogleFilters(){
    this.showAdminMenu = !this.showAdminMenu
  }
  refresh() {
    //console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      let userId = this.authService.currentUser.userId
      // this.companieService.getCompanieByUserId(userId)
      this.companieService.getCompanieForCurrentUser()
      .subscribe(
        (data => {
          this.companies = data
          this.companies.forEach(companie => {
            if(companie.typeCompanie === 'HQ')
              this.userBelongToHQ = true
          })
        })
      )
      this.profileService.getUserDetails(userId)
      .subscribe(
        (data => {
          this.fetchedUser = data.user
        })
        )


      this.companieService.getCompanieForCurrentUser()
        .subscribe(
          res => {
          //  console.log("companies");
            //console.log(res);


            //console.log(res)
            if(res.length) {
              this.HQCompanie = res[0]
              res.forEach((companie: Companie) => {
                if(this.isHQcompanie(companie))
                  this.HQCompanie =  companie
              })
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  isHQcompanie(companie: Companie){
    if(companie.typeCompanie === 'HQ')
      return true
    return false
  }

  // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  goToExterne(link: string){
    window.open(link, '_blank');
  }
  goTo(path: string) {
    this.sidenav.close()
    this.router.navigate([path]);
  }
  logout() {
    this.sidenav.close()
    this.authService.logout();
    let this2 = this
    setTimeout(function(){
        this2.router.navigate(['/user/login']);
    }, 150);

  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  isSalesRep() {
    return this.authService.isSalesRep();
  }
}
