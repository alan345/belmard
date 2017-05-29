import { Component, OnInit} from '@angular/core';
import { AuthService} from '../auth/auth.service';
import { PressService} from './press.service';
import { Press} from './press.model';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog } from '@angular/material';
import { Router  } from '@angular/router';
import { Location }               from '@angular/common';
import { UserService} from '../user/user.service';



@Component({
  selector: 'app-presses',
  templateUrl: './presses.component.html',
  styleUrls: ['./press.component.css'],

})
export class PressesComponent implements OnInit {
  fetchedPresses : Press[] = [];
  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  trackinPage: any= {
    lastVisitPagePressCount:[],
    lastVisitPageVideoCount:[]
  }

  constructor(
    private pressService: PressService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getPresses(this.paginationData.currentPage);
  }


  goBack() {
    this.location.back();
  }
  // openPictureDialog(form : Form){
  //   let dialogRef = this.dialog.open(SeePictureDialogComponent)
  //   dialogRef.componentInstance.form = form;
  //   dialogRef.afterClosed().subscribe(result => {
  //   })
  // }
  onDelete(id: string) {
    this.pressService.deletePress(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getPresses(this.paginationData.currentPage)
  }

  // getPage(page: number) {
  //   this.getPresses(page);
  // }

  getPresses(page: number) {
    this.loading = true;
    this.pressService.getPresses(page)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          let fetchedPressesTemp = res.data
          fetchedPressesTemp.forEach((press: Press) => {
            press['isNewObj'] = false
            this.trackinPage.lastVisitPagePressCount.forEach((objNotRead: any) => {
                if(objNotRead._id == press._id)
                  press['isNewObj'] = true
            })
            this.fetchedPresses.push(press)

          })
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
    let userId : string = this.authService.currentUser.userId

    this.pressService.countNewItemForUser()
    .subscribe(
      data => {
        this.trackinPage.lastVisitPagePressCount = data.item
        this.userService.getUser(userId)
          .subscribe(
            res => {
              res.user.trackinPage.lastVisitPagePress = new Date()
              this.userService.updateUser(res.user)
                .subscribe(
                  res => {},
                  error => {
                    console.log(error);
                  }
                )
            },
            error => {
              console.log(error);
            }
          )
      },
      error => console.log(error)
    )
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
