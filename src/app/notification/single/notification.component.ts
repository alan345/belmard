import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NotificationService} from '../notification.service';
import {UserService} from '../../user/user.service';



import {Notification, Permission, Access} from '../notification.model';

import {ToastsManager} from 'ng2-toastr';

import {MdDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';

import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';

@Component({
  selector: 'app-editNotification',
  templateUrl: './notification.component.html',
  styleUrls: ['../notification.component.css'],
})
export class NotificationComponent implements OnInit {
  fetchedNotification: Notification = new Notification()

  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  myForm: FormGroup;
  seeNotifications = false;
  seeCategProject = false;
  seeCategProduct = false;
  typesNotifications = [
    {name : 'Project', value: 'project'},
    {name : 'Product', value: 'product'},
    {name : 'Quote', value: 'quote'},
    {name : 'Reporting', value: 'reporting'},
    {name : 'Companie', value: 'companie'},
    {name : 'User', value: 'user'},
    {name : 'Paiement', value: 'paiementQuote'},
    {name : 'Task', value: 'task'},
    {name : 'userCalendar', value: 'userCalendar'},
    {name : 'Plan', value: 'plan'},
    {name : 'Notification', value: 'notification'},
    {name : 'Expense', value: 'expense'},

  ]
  constructor(
    private notificationService: NotificationService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      categJson: this._fb.group({
        categProduct: [''],
        categProject: ['']
      }),
      option: this._fb.group({
        calendar: this._fb.group({
          timeBegin: ['', [Validators.required, Validators.minLength(1)]],
          timeEnd: ['', [Validators.required, Validators.minLength(1)]],
        }),
      }),
      address: this._fb.group({
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      _users: this._fb.array([])
    })

    this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getNotification('')
        } else {
          this.getNotification(params['id'])
        }
      }
    })
  }
  setAllNotifications(){
    this.fetchedNotification.detailNotification.permissions = []
    this.typesNotifications.forEach(typesNotification => {
      let newPermission = new Permission()
      let newAccess1 = new Access()
      newAccess1.typeAccess = 'read'
      let newAccess2 = new Access()
      newAccess2.typeAccess = 'write'
      newPermission.namePermission = typesNotification.value
      newPermission.access.push(newAccess1)
      newPermission.access.push(newAccess2)
      this.fetchedNotification.detailNotification.permissions.push(newPermission)
    })
  }
  removeNotification(level, index1, index2, index3) {
    console.log(level)
      if(level === 2)
        this.fetchedNotification.detailNotification.permissions.splice(index2, 1)
      if(level === 3)
        this.fetchedNotification.detailNotification.permissions[index2].access.splice(index3, 1)
      // if(level === 3)
        // this.fetchedNotification.detailNotification[index1].permissions[index1].access.splice(index2, 1)
      // if(level === 3)
      //   this.fetchedCompanie.notifications[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  }
  addNotification(level, index1, index2, index3) {

      if(level === 1){
        let newNotification = new Permission()
        this.fetchedNotification.detailNotification.permissions.unshift(newNotification)
      }
      if(level === 2){

        let newNotification = new Access()
        this.fetchedNotification.detailNotification.permissions[index2].access.unshift(newNotification)
      }
  }

  openSection(nameSection){
    this[nameSection] = !this[nameSection]
  }

  // removeNotification(level, index1, index2, index3) {
  //     if(level === 0)
  //       this.fetchedNotification.notifications.splice(level, 1)
  //     if(level === 1)
  //       this.fetchedNotification.notifications.splice(index1, 1)
  //     if(level === 2)
  //       this.fetchedNotification.notifications[index1].permissions.splice(index1, 1)
  //     if(level === 3)
  //       this.fetchedNotification.notifications[index1].permissions[index1].access.splice(index2, 1)
  //     // if(level === 3)
  //     //   this.fetchedNotification.notifications[index1].permissions[index1].access[index2].subCateg.splice(index3, 1)
  // }



  fetchedCurrentUser: User = new User()
  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => { this.fetchedCurrentUser = res },
        error => { console.log(error) }
      )
  }








  save() {

    //this.fetchedNotification.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedNotification.categJson.categProduct))
    if(this.fetchedNotification._id) {
      this.notificationService.updateNotification(this.fetchedNotification)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
          //  this.router.navigate(['notification/' + this.fetchedNotification._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.notificationService.saveNotification(this.fetchedNotification)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedNotification = res.obj
            //  this.router.navigate(['notification/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }

//
// saveToMyNotification(){
//   this.notificationService.saveNotification(this.fetchedNotification)
//     .subscribe(
//       res => {
//         this.userService.addNotificationToMyself(res.obj)
//           .subscribe(
//             res => {
//               // this.userService.cleanCurrentUserInSession()
//               location.reload();
//               this.toastr.success('Great!', res.message)
//             },
//             error => {console.log(error)}
//           )
//         this.toastr.success('Great!', res.message)
//       },
//       error => {console.log(error)}
//     )
// }
  // move(i: number, incremet: number, typeUser: string) {
  //   if(i>=0 && i<=this[typeUser].length + incremet) {
  //     var tmp = this[typeUser][i];
  //     this[typeUser][i] = this[typeUser][i + incremet]
  //     this[typeUser][i + incremet] = tmp
  //     this.save()
  //   }
  // }


  onDelete(id: string) {
    this.notificationService.deleteNotification(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['notification/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  goBack() {
    this.location.back();
  }



  getNotification(id: string) {
    this.notificationService.getNotification(id, {})
      .subscribe(
        res => {
          this.fetchedNotification = res
        },
        error => {
          console.log(error);
        }
      )
  }
  isAdmin() {
    return this.authService.isAdmin();
  }


}
