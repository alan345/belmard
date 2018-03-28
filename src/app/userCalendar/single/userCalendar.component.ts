import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserCalendarService} from '../userCalendar.service';
import {MatDialog } from '@angular/material';
import {Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { UserCross} from '../../user/user.model';
import { DeleteDialogComponent } from '../../nav/deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Search } from '../../shared/shared.model';
import {UserCalendar} from '../userCalendar.model';
// import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';


// import {ToastsManager} from 'ng2-toastr';

// import { Quote } from '../../quote/quote.model';
// import { Product } from '../../product/product.model';
// import { Project } from '../../project/project.model';





@Component({
  selector: 'app-user-calendar',
  templateUrl: './userCalendar.component.html',
  styleUrls: ['../userCalendar.component.css'],
})
export class UserCalendarComponent implements OnInit, OnChanges {
  @Input() fetchedUserCalendar: UserCalendar = new UserCalendar()
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Input() search = new Search()
  loading = false;
  // fetchedUserCross: UserCross = new UserCross()
  // fetchedUserCalendar: UserCalendar = new UserCalendar()
  myForm: FormGroup;
  constructor(
    private userCalendarService: UserCalendarService,
    private userService: UserService,
    // private toastr: ToastsManager,
    public dialog: MatDialog,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,

  ) {}
  ngOnChanges() {
    // console.log(this.search)
    // this.fetchedUserCalendar.clients.forEach(client => {
    //   this.getUserCross(client._id)
    // })
    // console.log(this.fetchedUserCalendar)


    // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
    // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
  }
  // getUserCross(id: string) {
  //   this.loading = true
  //   this.userService.getUserCross(id)
  //     .subscribe(
  //       res => {
  //         this.loading = false
  //         this.fetchedUserCross = res
  //         console.log(res)
  //       },
  //       error => {
  //         this.loading = false
  //         console.log(error);
  //       }
  //     )
  // }
  removeClient() {
    this.fetchedUserCross = new UserCross()
  }
  ngOnInit() {
    this.myForm = this._fb.group({
      title: [''],
      description: [''],
    })

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   if(params['idUserCalendar'])
    //     this.getUserCalenddar(params['idUserCalendar'])
    // })
  }
  selectUser(user: User) {
    // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
    // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
    // this.fetchedUserCalendar.users = [user]
  }
  // selectProject(project: Project) {
  //   console.log(project)
  //
  //   // this.fetchedUserCalendar.clients = project.clients
  //   // this.fetchedUserCalendar.projects = [project]
  // }
  removeProject() {
    // this.fetchedUserCalendar.clients = []
    // this.fetchedUserCalendar.projects.splice(i, 1);
  }
  removeUser() {
    // this.fetchedUserCalendar.users.splice(i, 1);
  }
  // getUserCalenddar(id: string) {
  //   this.userCalendarService.getUserCalendar(id)
  //     .subscribe(
  //       res => {
  //         this.fetchedUserCalendar = res
  //         console.log(res)
  //         // this.fetchedUserCalendar.users.forEach(client => { this.search.userId = client._id })
  //         // this.fetchedUserCalendar.assignedTos.forEach(client => { this.search.assignedToId = client._id })
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  // }


  openDialogDelete() {
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        let this2 = this;
        this.onDelete(this.fetchedUserCalendar._id).then(function(){
          this2.deleted.emit()
          // this2.router.navigate(['paiementQuote']);
        })

      }
    })
  }

  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userCalendarService.deleteUserCalendar(id)
        .subscribe(
          res => {
            this2.authService.successNotif(res.message);

            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }

linkClicked() {
  this.save()
}

// selectClient(result) {
//   console.log(result)
// }
newInterventionCLicked() {
  this.save()
}

    save() {

      if(this.fetchedUserCalendar._id) {
        this.userCalendarService.updateUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              console.log(res)
              this.authService.successNotif(res.message)
              this.saved.emit(res)
            },
            error => {
              // this.toastr.error('error!', error)
            }
          )
      } else {
        this.userCalendarService.saveUserCalendar(this.fetchedUserCalendar)
          .subscribe(
            res => {
              console.log(res)
              this.authService.successNotif(res.message)
              this.saved.emit(res)
            },
            error => {console.log(error)}
          )
      }
    }
}
