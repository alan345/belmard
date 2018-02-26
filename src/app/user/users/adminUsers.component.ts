import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserService} from '../../user/user.service';
import { User} from '../../user/user.model';
import { ToastsManager} from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Search, PaginationData } from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';




@Component({
  selector: 'app-users',
  templateUrl: './adminUsers.component.html',
  styleUrls: ['../../user/user.component.css'],

})
export class AdminUsersComponent implements OnInit {
  fetchedUsers: User[] = [];
  loading = false;
  search: Search = new Search();
  createNewTeam = false;
  // {
  //   orderBy : '',
  //   search: '',
  //   isExternalUser: true,
  //   role: ''
  // };
  paginationData: PaginationData = new PaginationData()
  // {
  //   currentPage: 1,
  //   itemsPerPage: 0,
  //   totalItems: 0
  // };


  constructor(
    private userService: UserService,
    private globalEventsManager: GlobalEventsManager,
    private toastr: ToastsManager,
    private router: Router,
    private location: Location,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit() {



    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['isExternalUser']) {
        this.search.isExternalUser = (params['isExternalUser'] === 'true')
        this.search.orderBy = 'profile.lastName';
        // this.search.role = 'client';
        this.getUsers(this.paginationData.currentPage, this.search);
      }
    })


  }
  // goBack() {
  //   this.location.back();
  // }

  saved(result) {
    this.getUsers(this.paginationData.currentPage, this.search);
  }

  // onSelectChange = ($event: any): void => {
  //   // console.log($event.tab.content.viewContainerRef.element.nativeElement.getAttribute('data-value'))
  //   this.search.isExternalUser = $event.tab.content.viewContainerRef.element.nativeElement.getAttribute('data-isExternalUser')
  //   this.getUsers(this.paginationData.currentPage, this.search);
  //
  // }

  searchUsers() {
    this.getUsers(1, this.search)
  }

  searchInput() {
    this.getUsers(this.paginationData.currentPage, this.search);
  }
  orderBy(orderBy: string) {
    // this.search.orderBy = orderBy;
    this.getUsers(this.paginationData.currentPage, this.search);
  }

  onDelete(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        res => {
          this.authService.successNotif(res.message);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getUsers(page, this.search);
  }

  getUsers(page: number, search: any) {
    this.loading = true
    this.userService.getUsers(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedUsers =  res.data;
          this.loading = false
          this.checkIfCanCreateNewTeamUser()
        },
        error => {
          console.log(error);
          this.loading = false
        }
      );
  }

  checkIfCanCreateNewTeamUser() {
    this.createNewTeam = false
    this.authService.getCurrentUser().rightsInApp.forEach(rightInApp => {
      rightInApp.detailRight.permissions.forEach(permission => {
        if (permission.namePermission === 'user') {
          permission.access.forEach(singleAccess => {
            if (singleAccess.typeAccess === 'create5') {
              if(this.fetchedUsers.length < 5) {
                this.createNewTeam = true
              }
            }
            if (singleAccess.typeAccess === 'create1') {
              if(this.fetchedUsers.length < 1) {
                this.createNewTeam = true
              }
            }
          })
        }
      })
    })
  }


}
