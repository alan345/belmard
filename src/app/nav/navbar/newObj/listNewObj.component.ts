import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {AdminService} from '../../../admin/services/admin.service';
import {Router} from '@angular/router';
import { UserService} from '../../../user/user.service';
import { User} from '../../../user/user.model';
import { CompanieGuardService} from '../../../companie/companieGuard.service'
import { PaiementGuardService} from '../../../user/paiement/paiementGuard.service'
import { ChangeDetectionStrategy} from '@angular/core';
import { GlobalEventsManager} from '../../../globalEventsManager';
import { NotificationService} from '../../../notification/notification.service';
import { Notification} from '../../../notification/notification.model';
import {Observable} from 'rxjs/Rx';
import { NotificationDialogComponent } from '../../../notification/single/dialog/notificationDialog.component';
import { MdDialog } from '@angular/material';



@Component({
  selector: 'app-listNewObj',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listNewObj.component.html',
  styleUrls: ['../navbar.component.css']
})
export class ListNewObjComponent implements OnInit {
  @Input() sidenav: any;
  showNavBar: boolean = false;
 // private userId: string = localStorage.getItem('userId');
  // private userId: string;
  fetchedUser: User = new User();
  fetchedNotifications: Notification[] = [];
  notificationsNotRead: number=0;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationService,
    public mdDialog: MdDialog,
    // private userService: UserService,
    private router: Router,
    // private companieGuardService: CompanieGuardService,
    // private paiementGuardService: PaiementGuardService,
  ) {
    this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
        // mode will be null the first time it is created, so you need to igonore it when null
        if (mode !== null) {
          this.showNavBar = mode;
          this.fetchedUser = this.authService.getCurrentUser()
        }
    });
  }



  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      //let userId = localStorage.getItem('userId');

      this.getNotifications(1, {})
      Observable.interval(1000 * 30).subscribe(x => {
        this.getNotifications(1, {})
      });

      this.globalEventsManager.showNavBar(true);
      this.showNavBar = true;
      this.fetchedUser = this.authService.getCurrentUser()
    }
  }
  cleanNotifications() {
    this.notificationsNotRead = 0
  }
  getNotifications(page: number, search: any) {
    this.notificationService.getNotifications(page, search)
      .subscribe(
        res => {
          this.fetchedNotifications =  res.data
          this.notificationsNotRead = 0
          this.fetchedNotifications.forEach(notif=> {
            if(notif.isRead === false) {
              this.notificationsNotRead++
            }
          })
        },
        error => {
          console.log(error);
        }
      );
  }

  openNotifDialog() {
    this.cleanNotifications();
    let dialogRef = this.mdDialog.open(NotificationDialogComponent, {
      height: '200px',
      width: '300px',
      position : {
        top: "70px",
        right:"70px",
      },
      data: {
        // search: this.search
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.saved.emit(result)
    })
  }

  openNewObejcts() {
    this.cleanNotifications();
    let dialogRef = this.mdDialog.open(NotificationDialogComponent, {
      height: '200px',
      width: '300px',
      position : {
        top: "70px",
        right:"70px",
      },
      data: {
        // search: this.search
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.saved.emit(result)
    })
  }



  // isCurrentUserIsInSubPeriod(){
  //   return this.userService.isCurrentUserIsInSubPeriod()
  // }

  // isCurrentUserIsInSubPeriod(){
  //   // console.log('aa')
  //   //return true;
  //   return this.authService.isCurrentUserIsInSubPeriod()
  // }
  // isCurrentUserHasCompanie(){
  //   // console.log('bb')
  //   // return true;
  //   return this.authService.isCurrentUserHasCompanie()
  // }


  getUser(id: string) {

    this.fetchedUser = this.authService.getCurrentUser()
    console.log(this.fetchedUser)
    // let this2 = this
    // setTimeout(function(){
    //     this2.fetchedUser = this2.authService.getCurrentUser()
    // }, 2000);

    // this.userService.getUser(id)
    //   .subscribe(
    //     res => { this.fetchedUser = res },
    //     error => { console.log(error) }
    //   )
  }

  isCurrentUserIsInSubPeriod() {
    return this.authService.isCurrentUserIsInSubPeriod()
  }
  showObjHTML(nameObject) {
    return this.authService.showObjHTML(nameObject)
  }
  // isCurentUserHasAccess(nameObject, typeAccess) {
  //   return this.authService.isCurentUserHasAccess(nameObject, typeAccess);
  // }

  // check if user is logged in by asking our authentication service, we use this function in html file *ngIf directive
  isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  // this calls the logout function from our authentication service, it's activated when user clicks logout in front end.
  // It's called by the (click)='logout()' when the user presses the button
  logout() {
    this.globalEventsManager.showNavBar(false);
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
